# daily-task-manager
Welcome to the daily task manager app! We wanted users to be able to add daily tasks for themselves and assign a due date of completion. We then wanted users to be able to mark each task as either complete or incomplete. The app also includes a login/register form.

> Here are our models including field names and their datatypes:
```
const userSchema = new mongoose.Schema({
	email: {
         type: String, 
         required: true
  },
	password: {
         type: String, 
         required: true
  },
});


const taskSchema = new mongoose.Schema({
	name: {
        type: String, 
        required: true
  },
     dueDate: {
         type: String, 
          required: true
  },
	completion: {
         type:Boolean, 
         default: false
  },
});
```
> Here is a list of our routes (e.g. `POST /pins/ allows users to post a picture of a pin`)<br />

| Http Method | action  | Path          | 
| ----------- | ------- | ------------- | 
| **GET**     | index   | /tasks     | 
| **POST**    | create  | /tasks     | 
| **PUT**     | update  | /tasks/:id | 
| **DELETE**  | destroy | /tasks/:id | 

Check out or wireframes:

<img width="728" alt="Screen Shot 2021-10-19 at 6 09 11 PM" src="https://media.git.generalassemb.ly/user/36959/files/57413280-3109-11ec-957e-27c1b700ee7b">
<img width="1187" alt="Screen Shot 2021-10-19 at 6 09 19 PM" src="https://media.git.generalassemb.ly/user/36959/files/590af600-3109-11ec-91be-e34cf2907304">

Now take a look at our user stories:

As a user I want to be able to login into my task manager app.
As a user I want to be able to add tasks to my app.
As a user I want to be able to edit/update my tasks in my app.
As a user I want to be able to delete my tasks in my app.
As a user I want to be able to assign a due date to my task.
As a user I want to be able to mark a task as complete/incomplete in my app.


We hope our app will help you reach your goals every day!
