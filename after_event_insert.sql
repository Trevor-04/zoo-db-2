DELIMITER //

CREATE TRIGGER after_event_insert
AFTER INSERT ON Events
FOR EACH ROW
BEGIN
    DECLARE eventSubject VARCHAR(255);
    DECLARE eventMessage TEXT;

    SET eventSubject = CONCAT('Notification: New Event "', NEW.eventName, '" has been scheduled');
    SET eventMessage = CONCAT('A new event "', NEW.eventName, '" has been scheduled for ', NEW.eventTime, '. Don\'t miss out!');

    -- Notify Marketing Employees
    INSERT INTO Email_notifications (recipientEmail, subject, message)
    SELECT email, eventSubject, eventMessage
    FROM Employees
    WHERE departmentID = (SELECT departmentID FROM Departments WHERE DepartmentName = 'Marketing' LIMIT 1);
END //

DELIMITER ;
