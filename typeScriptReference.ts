// To compile this file run: tsc -t es5 typeScriptNotes.ts
// To run the compiled file: node typeScriptNotes.js

// ** access modifiers in TypeScript ** \\

// public: all variables and function members can be used in and out of a class
// private: variables and functions within a class can only be referred to in the class it is a part of
// protected: variables and functions within a class can only be referred to in the class it is a part of or within subclasses

//----------------------------------------------------------------

// ** optional params in TypeScript ** \\
// Add a question mark (?) after a parameter to make it optional
function optionalNum(num?: number) {
    console.log(num);
}

console.log('Optional param examples: ');
optionalNum(); // notice there is no error for not adding parameter. Will print undefined here since we didn't leave a default
optionalNum(15); // will print 15 since we sent in a value

// add a default value to a param to make it optional, and if no value is sent in for the parameter, it will use your default value
function optionalNum2(num: number = 1) {
    console.log(num);
}

console.log('\n','Optional param examples with default: ');
optionalNum2(); // notice there is no error for not adding parameter. Will print our default value 1 since we passed nothing.
optionalNum2(15); // will print 15 since we sent a value;

//----------------------------------------------------------------

// ** casting types in TypeScript ** \\
let aVariableWhoseTypeIsAny;

let num:number = <number>aVariableWhoseTypeIsAny;
// or
let num2:number = aVariableWhoseTypeIsAny as number;

//----------------------------------------------------------------

// ** function declarations in TypeScript ** \\

// using the function keyword
function log(message) {
    console.log(message)
}

// function expression
let log2 = function(message) {
    console.log(message)
}

// arrow function
let log3 = (message) => {
    console.log(message)
}

//----------------------------------------------------------------

// ** custom types (AKA Interfaces) ** \\
console.log('\n','Interface example:')
interface Dog { // always capitalize the first letter of an interface (good practice - helps differentiate between vars and types)
    name: string;
    breed: string;
    age: number;
    isVaccinated: boolean;
}

// Example of interface for variable declaration:
let myDog: Dog = {
    name: 'puppy',
    breed: 'lab',
    age: 3,
    isVaccinated: true
}
// Example of interface for function parameter
function isDogVaccinated(dog: Dog) {
    let response = dog.isVaccinated ? 'vaccinated' : 'not vaccinated';
    console.log(dog.name + " is " + response);
}
isDogVaccinated(myDog);

//----------------------------------------------------------------

// ** classes in TypeScript ** \\
console.log('\n','Class example:')
class Student {

    private name: string; // name of the student
    private overallGrade: number = 0; // current average in the class
    private assignmentGrades: Array<number> = []; // grade of each assignment taken

    // sets a student name for the class
    public setStudentName(name: string) {
        this.name = name;
    }

    // add an assignment grade for student and updates average
    public addStudentAssignmentGrade(grade: number) {
        this.assignmentGrades.push(grade);
        this.overallGrade = this.calculateOverallGrade(this.assignmentGrades);
    }

    /**
     * Calculates the students average in the class by taking sum of assignment averages and
     * dividing them by total number of assignments
     * @param assignmentG [Array<number>] a number array containing assignment averages
     * @returns [number] the average
     */
    private calculateOverallGrade(assignmentG: Array<number>): number {
        let average = 0;
        assignmentG.forEach( (grade) => {
            average += grade;
        });
        average = average/assignmentG.length;
        return average;
    }

    // get student name
    public getStudentName(): string {
        return this.name;
    }

    // get the student overall grade
    public getStudentOverallGrade(): string {
        return this.overallGrade.toFixed(2); // we use toFixed to round to 2 decimal spots. It returns a string so the return type of the function must be a string (or 'any')
    }
}

// use the Student class to create a new student
let myStudent = new Student();
// give the student a name (if no private access modifier on the class variable, you can do: myStudent.name = 'Chris')
myStudent.setStudentName('Chris');
// add some grades using our class function
myStudent.addStudentAssignmentGrade(95);
myStudent.addStudentAssignmentGrade(81);
myStudent.addStudentAssignmentGrade(90); // overall student average is being updated automatically thanks to our private calculateOverallGrade function being called after every grade entry

// now we can check the overall grade of this student using our getter functions (again, if there are no private access modifiers, we can just call them directly. I.e myStudent.overallGrade)
console.log(myStudent.getStudentName() + ': ' + myStudent.getStudentOverallGrade());

//----------------------------------------------------------------

// ** constructors in TypeScript ** \\
// Constructors run when a new instance of the class is assigned. This is useful for assigning default values for your class variables. Another bonus is you can define class variables here too
// lets use the same class from above but add a constructor. Notice the 'name' variable is defined and initially assigned in the constructor.
console.log('\n','Class with constructor example:')
class Student2 {

    overallGrade: number = 0; // current average in the class
    assignmentGrades: Array<number> = []; // grade of each assignment taken

    constructor(public name: string) { // you MUST have an access modifier to define the class variable in a constructor if there is no set function
        this.name = name;
    }

    // add an assignment grade for student and updates average
    public addStudentAssignmentGrade(grade: number) {
        this.assignmentGrades.push(grade);
        this.overallGrade = this.calculateOverallGrade(this.assignmentGrades);
    }

    /**
     * Calculates the students average in the class by taking sum of assignment averages and
     * dividing them by total number of assignments
     * @param assignmentG [Array<number>] a number array containing assignment averages
     * @returns [number] the average
     */
    private calculateOverallGrade(assignmentG: Array<number>): number {
        let average = 0;
        assignmentG.forEach( (grade) => {
            average += grade;
        });
        average = average/assignmentG.length;
        return average;
    }

    // get student name
    public getStudentName(): string {
        return this.name;
    }

    // get the student overall grade
    public getStudentOverallGrade(): string {
        return this.overallGrade.toFixed(2); // we use toFixed to round to 2 decimal spots. It returns a string so the return type of the function must be a string (or 'any')
    }
}
// now when we create a new student we can initialize the name at the same time
let studentOne = new Student2('Chris');
let studentTwo = new Student2('Antonio');

// add some grades
studentOne.addStudentAssignmentGrade(78);
studentTwo.addStudentAssignmentGrade(90);
studentOne.addStudentAssignmentGrade(98);
studentTwo.addStudentAssignmentGrade(92);

// print student grades
console.log(studentOne.name + ': ' + studentOne.overallGrade);
console.log(studentTwo.name + ': ' + studentTwo.overallGrade);

//----------------------------------------------------------------
// ** using set and get in a class
class SetGet{

    constructor(private _yourNum?: number) {
        this._yourNum = num;
    }

    // use set
    set yourNum(num: number) {
        if (num < 0) {
            console.log('The number can\'t be negative');
        } else {
            this._yourNum = num;
        }
    }

    // use get
    get yourNum() {
        return this._yourNum;
    }
}
console.log('\n', 'set and get example');
let setget = new SetGet();
setget.yourNum = 15;
console.log(setget.yourNum);
