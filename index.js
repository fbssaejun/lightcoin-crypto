class Account {

  constructor(name) {
    this.name = name;
    this.transactions = [];
  }

  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
  	this.transactions.push(transaction);
  }
}

// abstract class
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) return "Not enough money!";
    this.time = new Date();
    this.account.addTransaction(this);
    return "Transaction Success!";
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposits always allowed thanks to capitalism.
    return true;
  }
}

// DRIVER CODE BELOW
const myAccount = new Account("Anthony Kim");
console.log('This is your account : ', myAccount);
const t1 = new Withdrawal(1.00, myAccount);
console.log(t1.commit());
console.log('Account Balance: ', myAccount.balance);
const t2 = new Deposit(299.99, myAccount);
console.log('Depositing...');
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);
const t3 = new Withdrawal(199.99, myAccount);
console.log("Withdrawing..")
console.log('Commit result:', t3.commit());
console.log('Now you have : ',myAccount.balance);
console.log('Account Transaction History: ', myAccount.transactions);
