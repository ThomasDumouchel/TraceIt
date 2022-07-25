package com.TexasTom123.demo.profile;

import com.TexasTom123.demo.datastore.FakeUserProfileDataStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class UserProfileDataAccessService {
    private final FakeUserProfileDataStore fakeUserProfileDataStore;

    @Autowired
    public UserProfileDataAccessService(FakeUserProfileDataStore fakeUserProfileDataStore) {
        this.fakeUserProfileDataStore = fakeUserProfileDataStore;
    }

    List<UserProfile> getuserProfiles() {
        return fakeUserProfileDataStore.getUserProfiles();
    }

    public UserProfile getUserProfileById(UUID userProfileId) {
        return fakeUserProfileDataStore
                .getUserProfiles()
                .stream()
                .filter(up -> up.getUserProfileId().equals(userProfileId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException(String.format("User profile %s not found", userProfileId)));

    }
}
