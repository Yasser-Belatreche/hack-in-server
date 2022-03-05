import { Request, Response } from "express";
import { activitiesService } from "../../../../UseCases";

const addActivityHandler = async (req: Request, res: Response) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(500).json({ success: false, error: "not autorized" });
    }

    const data = await activitiesService.addActivity({
      authToken: authorization,
      ...req.body,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {}
};

export { addActivityHandler };
