import { Request, Response } from "express";
import { authService } from "../../../../UseCases";

const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const token = await authService.login(email, password);

    res.status(200).json({ success: true, data: token });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export { loginHandler };
