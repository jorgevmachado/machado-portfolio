import { Request, Response } from 'express';

export function findAll(req: Request, res: Response, list: Array<unknown>) {
  const { page, limit } = req.query;
  if (!page || !limit) {
    return res.json(list);
  }

  return res.json({
    skip: 0,
    next: 0,
    prev: 0,
    total: list.length,
    pages: 1,
    results: list,
    per_page: limit,
    current_page: page,
  });
}

export function findOne(
  req: Request,
  res: Response,
  list: Array<unknown>,
  alias: string,
  onlyId?: boolean,
) {
  const { param } = req.params;
  const paramNumber = Number(param);
  const onlyIdFilter = {
    key: 'id',
    value: param,
  };
  const filter = !onlyId
    ? {
        key: isNaN(paramNumber) ? 'name' : 'id',
        value: isNaN(paramNumber) ? param : paramNumber,
      }
    : onlyIdFilter;
  const result = list.find((result) => result[filter.key] === filter.value);
  if (!result) {
    return res.status(404).json({
      message: `${alias} not found`,
      error: 'Not Found',
      statusCode: 404,
    });
  }
  return res.json(result);
}


export function createByName(req: Request, res: Response, list: Array<unknown>) {
    const { body: { name } } = req;
    const exist = list.find((item) => item['name'] === name);
    if (exist) {
        return res.json({ message: 'Registration Completed Successfully!'});
    }

    return res.status(409).json({
        message: `Key (name)=(${name}) already exists.`,
        error: 'Conflict',
        statusCode: 400,
    });
}