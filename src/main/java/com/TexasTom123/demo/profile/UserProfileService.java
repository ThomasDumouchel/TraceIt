package com.TexasTom123.demo.profile;

import com.TexasTom123.demo.bucket.BucketName;
import com.TexasTom123.demo.filestore.FileStore;
import com.sun.jdi.event.ExceptionEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class UserProfileService {

    private final UserProfileDataAccessService userProfileDataAccessService;

    private final FileStore fileStore;

    @Autowired
    public UserProfileService(UserProfileDataAccessService userProfileDataAccessService, FileStore fileStore) {
        this.userProfileDataAccessService = userProfileDataAccessService;
        this.fileStore = fileStore;
    }

    List<UserProfile> getUserProfiles() {
        return userProfileDataAccessService.getuserProfiles();
    }

    void uploadUserProfileImage(UUID userProfileId, MultipartFile file) {
        // 1. Check if image is not empty
        if (file.isEmpty()){
            throw new IllegalStateException("Cannot upload empty file [" + file.getSize() + "]");
        }
        // 2. Check if file is an image
        if (!file.getContentType().startsWith("image/")){
            throw new IllegalStateException("File must be an image");
        }
        // 3. Check whether the user exists in our database
        try{
            var userProfile = userProfileDataAccessService.getUserProfileById(userProfileId);
            // 4. Grab some metadata from file if any
            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Content-Length", String.valueOf(file.getSize()));
            // 5. Store the image in s3 and update database (userProfileImageLink) with s3 image link
            String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), userProfile.getUserProfileId());
            String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            userProfile.setUserProfileImageLink(filename);
        }
        catch (Exception e){
            // TODO: handle it here, but most likely in the controller
            throw new IllegalStateException(e);
        }


    }
    public byte[] downloadUserProfileImage(UUID userProfileId) {
        try{
            var userProfile = userProfileDataAccessService.getUserProfileById(userProfileId);
            String path = String.format("%s/%s",
                    BucketName.PROFILE_IMAGE.getBucketName(),
                    userProfile.getUserProfileId()
            );
            return userProfile.getUserProfileImageLink()
                    .map(key -> fileStore.download(path, key))
                    .orElse(new byte[0]);
        }
        catch (Exception e){
            throw new IllegalStateException(e);
        }
    }
}
