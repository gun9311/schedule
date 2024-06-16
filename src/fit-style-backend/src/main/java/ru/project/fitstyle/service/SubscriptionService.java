package ru.project.fitstyle.service;

import ru.project.fitstyle.model.dto.subscription.ApplyGroupDto;
import ru.project.fitstyle.model.entity.subscription.Subscription;

import java.util.List;

public interface SubscriptionService {

    List<ApplyGroupDto> checkApplyById(final Long id);

    // List<SubscriptionTypeDto> getAllSubscriptionTypes();

    // Subscription createFitUserSubscription(final Long subscriptionTypeId, final String contractNumber);

    // void save(SubscriptionType subscriptionType);
}
