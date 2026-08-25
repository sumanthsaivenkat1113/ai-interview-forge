import type { CSQuestion } from "@/server/modules/interview/question-bank/question-bank.types";

export const CS_QUESTIONS: CSQuestion[] = [
  {
    qno: 1,
    baseQuestion: "What is DBMS?",
    followUpQuestions: {
      question1: "What are the advantages of DBMS over traditional file systems?",
      question2: "What is the difference between DBMS and RDBMS?",
    },
  },
  {
    qno: 2,
    baseQuestion: "What are ACID properties in DBMS?",
    followUpQuestions: {
      question1: "Explain each ACID property with an example.",
      question2: "What happens if a database does not follow ACID properties?",
    },
  },
  {
    qno: 3,
    baseQuestion: "What are the different types of database keys?",
    followUpQuestions: {
      question1: "What is the difference between a Primary Key and a Foreign Key?",
      question2: "Can a table have multiple candidate keys?",
    },
  },
  {
    qno: 4,
    baseQuestion: "What is the difference between DELETE, TRUNCATE, and DROP in SQL?",
    followUpQuestions: {
      question1: "Which of these commands can be rolled back?",
      question2: "When would you use DELETE instead of TRUNCATE?",
    },
  },
  {
    qno: 5,
    baseQuestion: "Explain different types of Joins in SQL.",
    followUpQuestions: {
      question1: "What is the difference between INNER JOIN and LEFT JOIN?",
      question2: "When would you use a CROSS JOIN?",
    },
  },
  {
    qno: 6,
    baseQuestion: "What is Object-Oriented Programming (OOP)?",
    followUpQuestions: {
      question1: "Explain the four pillars of OOP.",
      question2: "How is OOP different from Procedural Programming?",
    },
  },
  {
    qno: 7,
    baseQuestion: "What is the difference between Abstraction and Encapsulation?",
    followUpQuestions: {
      question1: "Give a real-world example of Abstraction and Encapsulation.",
      question2: "How do Access Modifiers help in Encapsulation?",
    },
  },
  {
    qno: 8,
    baseQuestion: "What is the difference between Method Overloading and Method Overriding?",
    followUpQuestions: {
      question1: "Can we override a static method in Java/C++?",
      question2: "What is the role of the 'virtual' keyword in Overriding?",
    },
  },
  {
    qno: 9,
    baseQuestion: "What is the difference between an Abstract Class and an Interface?",
    followUpQuestions: {
      question1: "When should you use an Abstract Class over an Interface?",
      question2: "Can an Abstract Class have a constructor? Can an Interface?",
    },
  },
  {
    qno: 10,
    baseQuestion: "What is Polymorphism in OOP?",
    followUpQuestions: {
      question1: "Explain Compile-time vs Runtime Polymorphism with examples.",
      question2: "How does Polymorphism help in achieving code flexibility?",
    },
  },
];
