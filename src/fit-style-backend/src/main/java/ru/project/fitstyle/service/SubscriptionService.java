package ru.project.fitstyle.service;

import ru.project.fitstyle.model.dto.subscription.ApplyGroupDto;
import ru.project.fitstyle.model.entity.subscription.Subscription;

import java.util.List;

import ru.project.fitstyle.model.dto.subscription.SubscriptionDto;

public interface SubscriptionService {

    List<ApplyGroupDto> checkApplyById(final Long id);

    void save(final Subscription subscription);

    List<SubscriptionDto> getApplyUser(final Long id);
    
    Subscription findById(final Long id);

    void deleteById(final Long id);

    void acceptApply(final Long id);

    // List<SubscriptionTypeDto> getAllSubscriptionTypes();

    // Subscription createFitUserSubscription(final Long subscriptionTypeId, final String contractNumber);

    // void save(SubscriptionType subscriptionType);
}
