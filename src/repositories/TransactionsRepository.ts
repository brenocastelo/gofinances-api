import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulated, transaction) => {
        if (transaction.type === 'income') {
          accumulated.income += transaction.value;
        } else {
          accumulated.outcome += transaction.value;
        }

        const total = accumulated.income - accumulated.outcome;

        return { ...accumulated, total };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    /**
     * [x] receber parâmetros do service
     * [x] persistir os dados (instanciando o model obj)
     * [x] retornar objeto da transação
     */
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
