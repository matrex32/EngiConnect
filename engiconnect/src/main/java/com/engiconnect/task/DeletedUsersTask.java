package com.engiconnect.task;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.engiconnect.model.User;
import com.engiconnect.model.UserStatus;
import com.engiconnect.repository.UserRepository;
import com.engiconnect.utility.DateUtility;

/**
 * A scheduled task that processes deleted users on a daily basis, checking if the deleted users should be permanently deleted from the database.
 * 
 * @author Denis
 */
@Component
public class DeletedUsersTask {
	
	/**
	 * Instance of UserRepository to interact with the database.
	 */
	@Autowired
	private UserRepository userRepository;
	
	/**
	 * Instance of a utility class to calculate the number of days left before a deleted user should be permanently deleted.
	 */
	@Autowired
	private DateUtility daysLeftUtility;

	/**
	 * Scheduled task that runs daily at midnight to process users marked as "deleted" and check if they should be permanently deleted from the repository.
	 */
	@Scheduled(cron = "0 0 0 * * ?")
	public void processDeletedUsers() {
		List<User> deletedUsers = userRepository.findByStatus(UserStatus.DELETED.getStatus());

		for (User user : deletedUsers) {
			int daysLeft = daysLeftUtility.getDaysLeftForRecovery(user);

			if (daysLeft == 0) {
				userRepository.delete(user);
			}
		}
	}
	
	/**
	 * Scheduled task that runs daily at midnight to process users marked as "new" and check if they should be permanently deleted from the repository.
	 */
	@Scheduled(cron = "0 0 0 * * ?")
	public void processDeleteUnconfirmedUsers() {
		List<User> newUsers = userRepository.findByStatus(UserStatus.NEW.getStatus());

		for (User user : newUsers) {
			int daysLeft = daysLeftUtility.getDaysLeftForConfirmAccount(user);

			if (daysLeft == 0) {
				userRepository.delete(user);
			}
		}
	}
}
