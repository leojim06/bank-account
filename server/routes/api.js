const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Accounts = require('../models/account');

// DB connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bank');

// GET: obtener todas las cuentas
router.get('/accounts', (req, res) => {
  Accounts.find({}, (err, accounts) => {
    return err ?
      res.status(400).json(err) :
      res.status(200).json(accounts);
  });
});

// GET: _id obtener cuenta por id
router.get('/accounts/:_id', (req, res) => {
  const accountId = req.params._id;

  // Verificar si id es valido
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).send({
      message: 'Id de cuenta no valida'
    });
  }

  Accounts.findById(accountId, (err, account) => {
    return err ?
      res.status(400).json(err) :
      res.status(200).json(account);
  });
});

// POST: crear cuenta
router.post('/accounts', (req, res) => {
  const newAccount = req.body.account;
  Accounts.create(newAccount, (err, account) => {
    return err ?
      res.status(400).json(err) :
      res.status(201).json(account);
  });
});

// POST: agregar transacción
router.post('/accounts/:_id/transaction', (req, res) => {
  const accountId = req.params._id;
  const newTransaction = req.body.transaction;

  // Verificar si id es valido
  if (!mongoose.Types.ObjectId.isValid(accountId)) {
    return res.status(400).send({
      message: 'Id de cuenta no valida'
    });
  }

  Accounts.findById(accountId, (err, account) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      account.transacciones.push(newTransaction);
      account.save((e, a) => {
        return err ?
          res.status(400).json(err) :
          res.status(201).json({ account: a, transaction: newTransaction });
      });
    }
  });

});

// DELETE: eliminar cuenta
router.delete('/accounts/:_id', (req, res) => {
  res.status(404).send({ message: 'No se puede eliminar cuentas sin autorizacion' });
});


module.exports = router;