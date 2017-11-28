class Queue {
	//initiates the Queue
	constructor(){
  	this.items=[];
  }
  //returns true if there are no items in the queue
  isEmpty(){
  	return this.items.length ==0;
  }
  //adds items in to the queue
  enqueue(item){
  	this.items.push(item);
  }
  //returns & removes the first item that is added into the queue
  dequeue(){
  	return !this.isEmpty() ? this.items.shift(): undefined;
  }
  //returns the first item that is added into the queue
  peek(){
  	return !this.isEmpty() ? this.items[this.items.length - 1] : undefined;
  }
}
