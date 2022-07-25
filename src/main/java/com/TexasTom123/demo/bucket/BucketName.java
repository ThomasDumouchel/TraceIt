package com.TexasTom123.demo.bucket;

public enum BucketName {

    PROFILE_IMAGE("springbootdemo-image-upload");

    private final String bucketName;

    BucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public String getBucketName() {
        return bucketName;
    }


}
