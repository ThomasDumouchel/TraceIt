package com.TexasTom123.demo.registration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.function.Predicate;

@Component
public class EmailValidator implements Predicate<String> {

    @Override
    public boolean test(String s) {
        // TODO: regex to validate
        return true;
    }
}
