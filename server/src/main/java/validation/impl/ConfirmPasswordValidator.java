package validation.impl;

import com.facebook.server.dto.model.UserModel;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import validation.ConfirmPasswordValid;

public class ConfirmPasswordValidator implements ConstraintValidator<ConfirmPasswordValid, Object> {
    @Override
    public void initialize(ConfirmPasswordValid constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Object object, ConstraintValidatorContext constraintValidatorContext) {
        UserModel model = (UserModel) object;

        return model.getPassword().equals(model.getConfirmPassword());
    }
}