package ru.project.fitstyle.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.project.fitstyle.model.dto.subscription.ApplyGroupDto;
import ru.project.fitstyle.model.dto.subscription.SubscriptionDto;
import ru.project.fitstyle.model.entity.subscription.Subscription;
import ru.project.fitstyle.model.repository.SubscriptionRepository;
import ru.project.fitstyle.service.SubscriptionService;
import ru.project.fitstyle.service.exception.subscription.SubscriptionAlreadyExistsException;
import ru.project.fitstyle.service.exception.subscription.SubscriptionTypeNotFoundException;
import ru.project.fitstyle.service.exception.training.TrainingNotFoundException;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

@Service
public class FitSubscriptionService implements SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    @Autowired
    public FitSubscriptionService(final SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    @Override
    public void save(final Subscription subscription) {
        subscriptionRepository.save(subscription);
    }
    
    @Override
    public List<ApplyGroupDto> checkApplyById(final Long id) {
        return subscriptionRepository.checkApplybyId(id);
    }

    @Override
    public List<SubscriptionDto> getApplyUser(final Long id) {
        return subscriptionRepository.getApplyUser(id);
    }

    @Override
    public Subscription findById(final Long id) {
        return subscriptionRepository.findById(id)
        .orElseThrow(() -> new TrainingNotFoundException("Subscription with that id cannot be found!"));
    }

    @Override
    @Transactional
    public void acceptApply(final Long id) {
        Subscription subscription = this.findById(id);
        subscription.getGroupTraining().addFitUser(subscription.getFitUser());
    }   

    @Override
    public void deleteById(final Long id){
        subscriptionRepository.deleteById(id);
    }
    // @Override
    // public List<SubscriptionTypeDto> getAllSubscriptionTypes() {
    //     return subscriptionTypeRepository.findAllSubscriptions()
    //             .filter(list -> list.size() != 0)
    //             .orElseThrow(() -> new SubscriptionTypeNotFoundException("There are no subscription types!"));
    // }

    // @Override
    // public Subscription createFitUserSubscription(final Long subscriptionTypeId, final String contractNumber) {
    //     SubscriptionType subscriptionType = subscriptionTypeRepository.findById(subscriptionTypeId)
    //             .orElseThrow(() -> new SubscriptionTypeNotFoundException("Subscription type with that id cannot be found"));

    //     Subscription subscription = new Subscription();
    //     Date beginDate = new Date(new Date().getTime());

    //     Calendar calendar = Calendar.getInstance();
    //     calendar.setTime(beginDate);
    //     calendar.add(Calendar.MONTH, subscriptionType.getValidityMonths());

    //     subscription.setBeginDate(beginDate);
    //     subscription.setEndDate(calendar.getTime());
    //     subscription.setSubscriptionType(subscriptionType);
    //     subscription.setContractNumber(contractNumber);

    //     return subscription;
    // }

    // @Override
    // public void save(SubscriptionType subscriptionType) {
    //     if(subscriptionTypeRepository.existsByName(subscriptionType.getName())) {
    //         throw new SubscriptionAlreadyExistsException("Subscription type with that name already exists!");
    //     }
    //     subscriptionTypeRepository.save(subscriptionType);
    // }
}
