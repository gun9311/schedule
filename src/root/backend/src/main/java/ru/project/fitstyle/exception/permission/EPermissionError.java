package ru.project.fitstyle.exception.permission;

public enum EPermissionError {
    MISSED(1, "User with that id has been deleted or never been created!");

    private final int code;
    private final String message;

    EPermissionError(int code, String message)
    {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
