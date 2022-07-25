package com.TexasTom123.demo.datastore;

import com.TexasTom123.demo.profile.UserProfile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class FakeUserProfileDataStore {

    private static final List<UserProfile> USER_PROFILES = new ArrayList<>();

    static {
        USER_PROFILES.add(new UserProfile(UUID.fromString("ec4eb437-1d64-4c26-9721-51d5cdf628f0"), "janetjones", null));
        USER_PROFILES.add(new UserProfile(UUID.fromString("a3ef384c-e979-47a6-bc4c-003e1b56dc91"), "antoniojunior", null));
    }

    public List<UserProfile> getUserProfiles() {
        return USER_PROFILES;
    }
}
