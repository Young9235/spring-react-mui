package com.example.Server.exception;

public class DuplicateMemberException extends RuntimeException {
    
	private static final long serialVersionUID = -3917916024427648052L;
	
	public DuplicateMemberException() {
        super();
    }
    public DuplicateMemberException(String message, Throwable cause) {
        super(message, cause);
    }
    public DuplicateMemberException(String message) {
        super(message);
    }
    public DuplicateMemberException(Throwable cause) {
        super(cause);
    }
}
