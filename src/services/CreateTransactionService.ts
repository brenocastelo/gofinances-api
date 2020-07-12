import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    /**
     * [x] receber parâmetros da rota
     * [x] buscar saldo atual
     * [x] se o tipo da trnsação for outcome, verificar se tem saldo suficiente
     * para realizar essa transação, se não river lançar um erro
     * [x] se for do tipo income ou o saldo for suficiente para o outcome, criar
     * o um objecto com as informações da transação e passar para o método create do repository
     * [x] retornar objeto da transação
     */

    if (type === 'outcome' && value > balance.total) {
      throw Error("You don't have balance enough to complete this transacion");
    }

    const transacion = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transacion;
  }
}

export default CreateTransactionService;
