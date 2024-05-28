package com.engiconnect.events;

import com.engiconnect.model.Application;

import lombok.Getter;
import org.springframework.context.ApplicationEvent;

/**
 * Represents an application event for a job within the application.
 */
@Getter
public class ApplicationEventJob extends ApplicationEvent {

    private static final long serialVersionUID = 1L;

    /**
     * The application for which this event is associated.
     */
    private final Application application;

    /**
     * Constructs a new ApplicationEvent with the given source and associated application.
     * 
     * @param source the object on which the event initially occurred (never {@code null})
     * @param application the application for which this event is associated
     */
    public ApplicationEventJob(Object source, Application application) {
        super(source);
        this.application = application;
    }
}
