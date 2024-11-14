DELIMITER //

CREATE TRIGGER check_membership_expiry 
BEFORE UPDATE ON Members
FOR EACH ROW
BEGIN
    DECLARE end_date DATE;

    -- Calculate membership end date based on memberTerm
    SET end_date = CASE NEW.memberTerm
        WHEN 0 THEN DATE_ADD(NEW.subscribed_on, INTERVAL 1 MONTH)
        WHEN 1 THEN DATE_ADD(NEW.subscribed_on, INTERVAL 6 MONTH)
        WHEN 2 THEN DATE_ADD(NEW.subscribed_on, INTERVAL 12 MONTH)
        WHEN 3 THEN DATE_ADD(NEW.subscribed_on, INTERVAL 24 MONTH)
        ELSE NULL
    END;

    -- Check if the membership will expire within the next 5 days
    IF end_date IS NOT NULL AND end_date <= DATE_ADD(CURDATE(), INTERVAL 5 DAY) THEN
        -- Set expiry notification message
        SET NEW.expiry_notification = 'Membership ending within 5 days';
    ELSE
        SET NEW.expiry_notification = NULL; -- Clear notification if not applicable
    END IF;
END //

DELIMITER ;