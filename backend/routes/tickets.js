const express = require('express');
const ticketController = require('../functions/tickets'); 

const router = express.Router();

router.post('/add', async (req, res) => {
    const { ticketType, date_purchased, ticketPrice} = req.body;

    try {
        await ticketController.addTicket({ ticketType, date_purchased, ticketPrice});
        res.status(201).json({ message: 'Ticket added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add ticket' });
    }
});

// Delete a ticket by ID
router.delete('/:ticketID', async (req, res) => {
    const { ticketID } = req.params;

    try {
        await ticketController.deleteTicket({ ticketID });
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete ticket' });
    }
});

// Update a ticket by ID
router.put('/:ticketID', async (req, res) => {
    const { ticketID } = req.params;
    const { ticketType, date_purchased, ticketPrice } = req.body;

    try {
        await ticketController.updateTicket({ ticketID, ticketType, date_purchased, ticketPrice });
        res.status(200).json({ message: 'Ticket updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update ticket' });
    }
});

// List all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await ticketController.listTickets();
        res.status(200).json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list tickets' });
    }
});

// Get a ticket by ticketID
router.get('/:ticketID', async (req, res) => {
    const { ticketID } = req.params;

    try {
        const ticket = await ticketController.getTicketById({ ticketID });
        res.status(200).json(ticket || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get ticket by ID' });
    }
});

// Get tickets by ticketType
router.get('/type/:ticketType', async (req, res) => {
    const { ticketType } = req.params;

    try {
        const tickets = await ticketController.getTicketsByType({ ticketType });
        res.status(200).json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get tickets by type' });
    }
});

// Export the router
module.exports = router;