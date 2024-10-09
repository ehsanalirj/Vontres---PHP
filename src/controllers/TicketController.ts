import { Request, Response } from 'express';
import { TicketService } from '../services/TicketService';

export const createTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketService.createTicket({
      ...req.body,
      createdBy: req.user.id,
      company: req.user.company
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketService.updateTicket(req.params.id, req.body);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating ticket', error });
  }
};

export const assignTicket = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketService.assignTicket(req.params.id, req.body.userId);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error assigning ticket', error });
  }
};

export const addComment = async (req: Request, res: Response) => {
  try {
    const ticket = await TicketService.addComment(req.params.id, req.user.id, req.body.content);
    if (ticket) {
      res.json(ticket);
    } else {
      res.status(404).json({ message: 'Ticket not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};

export const getCompanyTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await TicketService.getTicketsByCompany(req.user.company);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};

export const getAgentTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await TicketService.getTicketsByAgent(req.user.id);
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};