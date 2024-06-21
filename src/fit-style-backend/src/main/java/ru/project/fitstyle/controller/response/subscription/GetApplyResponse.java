package ru.project.fitstyle.controller.response.subscription;

import lombok.Getter;

import java.util.List;

import ru.project.fitstyle.model.dto.subscription.SubscriptionDto;
@Getter
public class GetApplyResponse {

    private final List<SubscriptionDto> groupSubscriptions;

    public GetApplyResponse(final List<SubscriptionDto> groupSubscriptions){
        this.groupSubscriptions = groupSubscriptions;
    }

}
