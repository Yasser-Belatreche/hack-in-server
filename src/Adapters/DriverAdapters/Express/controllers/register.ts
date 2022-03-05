import { Request, Response } from "express";
import { authService } from "../../../../UseCases";

const registerHandler = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(req.body);

    res.status(200).json({ success: true, data: token });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export { registerHandler };
