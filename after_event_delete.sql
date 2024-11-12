DELIMITER //

CREATE TRIGGER after_event_delete
AFTER DELETE ON Events
FOR EACH ROW
BEGIN
    DECLARE eventSubject VARCHAR(255);
    DECLARE eventMessage TEXT;

    SET eventSubject = CONCAT('Notification: Event "', OLD.eventName, '" has been cancelled');
    SET eventMessage = CONCAT('We regret to inform you that the event "', OLD.eventName, '" scheduled on ', OLD.eventTime, ' has been cancelled.');

    -- Notify Members
    INSERT INTO Email_notifications (recipientEmail, subject, message)
    SELECT memberEmail, eventSubject, eventMessage
    FROM Members;

    -- Notify Administration Employees
    INSERT INTO Email_notifications (recipientEmail, subject, message)
    SELECT email, eventSubject, eventMessage
    FROM Employees
    WHERE departmentID = (SELECT departmentID FROM Departments WHERE DepartmentName = 'Administration' LIMIT 1);
END //

DELIMITER ;
