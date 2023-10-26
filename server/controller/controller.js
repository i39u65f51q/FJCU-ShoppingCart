import { Router } from 'express';
import { MemberService } from '../service/Member.service.js';
import { ProductService } from '../service/Product.service.js';
import { OrderService } from '../service/Order.service.js';

export const router = Router();

router.get('/api/member', (req, res) => {
  const service = new MemberService();

  const mock = [
    { id: 1, name: 'Alan', mobilePhone: '0912345678' },
    { id: 2, name: 'Benjamin', mobilePhone: '0922222228' },
    { id: 3, name: 'Steven', mobilePhone: '0900000000' },
  ];
  res.status(200).json({ content: mock });
});

router.get('/api/member/:memberId', (req, res) => {
  const { memberId } = req.params;
  const service = new MemberService();

  const mock = { id: memberId, name: 'Alan', mobilePhone: '0912345678' };
  res.status(200).json({ message: mock });
});

router.get('/api/product', (req, res) => {
  console.log(req);
  const service = new ProductService();

  const mock = [
    { id: 1, name: '商品A', price: 20, count: 12 },
    { id: 2, name: '商品B', price: 22, count: 9 },
    { id: 3, name: '商品C', price: 17, count: 11 },
  ];
  res.status(200).json({ content: mock });
});

router.get('/api/order', (req, res) => {
  console.log(req);
  const service = new OrderService();

  const mock = [
    {
      id: 1,
      member: { id: 1, name: 'Alan', mobilePhone: '0912345678' },
      totalPrice: 59,
      counts: 3,
      products: [
        { id: 1, name: '商品A', price: 20 },
        { id: 2, name: '商品B', price: 22 },
        { id: 3, name: '商品C', price: 17 },
      ],
      status: 1,
    },
  ];
  res.status(200).json({ content: mock });
});
