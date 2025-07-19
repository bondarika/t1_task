import type { Request, RequestHandler, Response } from 'express';
import { taskService } from './taskService';

class TaskController {
  public getTasks: RequestHandler = async (_req: Request, res: Response) => {
    const serviceResponse = await taskService.findAll();
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public getTask: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await taskService.findById(id);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public createTask: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await taskService.create(req.body);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public updateTask: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await taskService.update(id, req.body);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };

  public deleteTask: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id as string, 10);
    const serviceResponse = await taskService.delete(id);
    res.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

export const taskController = new TaskController();
