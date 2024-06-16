package ru.project.fitstyle.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ru.project.fitstyle.model.dto.subscription.ApplyGroupDto;
import ru.project.fitstyle.model.entity.subscription.Subscription;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    // @Query("select new ru.project.fitstyle.model.dto.subscription.SubscriptionTypeDto(v.id, v.name, v.validityMonths, v.placementTime, v.cost) " +
    //         "from SubscriptionType v")
    // Optional<List<SubscriptionTypeDto>> findAllSubscriptions();

    @Query("select new ru.project.fitstyle.model.dto.subscription.ApplyGroupDto(v.groupTraining.id) " +
            "from Subscription v " +
            "where v.fitUser.id = :id")
    List<ApplyGroupDto> checkApplybyId(@Param("id") Long id);
}
