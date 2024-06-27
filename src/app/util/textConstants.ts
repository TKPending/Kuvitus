export const TextConstants = {
    version: "V 2.0",
    status: {
      pause: "On-Pause",
      working: "Working On",
      stopped: "Stopped Development",
    },
    FAQ: [
      {
        question: "How to add a Major Goal",
        answer:
          "When on the landing page, clicking on the '+' button on the bottom right of the screen, will create a goal that moves around the screen.",
      },
      {
        question: "How to view a Goal?",
        answer:
          "To view a goal, just click on a goal of your choosing. Options will pop up on top of the goal, one saying 'View'. Click on this and you will be redirected to the Goals Page, where you can go into more details about your goals.",
      },
      {
        question: "How to update goal details?",
        intro: "Once on the Goals Page, you can update your goals by:",
        points: [
          "Title: Clicking on the title and inputting your new goal title.",
          "Description: Clicking underneath the 'Description' text which will allow you to add a description to your goal.",
          "Goal Status: By clicking on the Status of your goal you can change your goals to Complete, Pending, or Uncomplete.",
          "You can also set dates on your goals by clicking on the calendar.",
          "Drawing Canvas: Click on the tool you want to use and get to drawing!"
        ]
      },
      {
        question: "How to create and update Sub Goals",
        answer:
          "Pressing on the 'Add a sub goal' button will allow you to add Sub Goals. You can click on it to open up the dropdown for the goal. Which will allow you to add your own Sub Goal Description, Tags, Status, Dates, Title and to Delete a Sub Goal.",
      },
      {
        question: "How does the drawing canvas work?",
        answer:
          "Similar to Excalidraw. Once clicking on a tool you will be able to start drawing, creating Squares, Lines, Pencil and Text. More tools coming soon.",
      },
    ],
    about: [
      {
        question: "What inspired Kuvitus?",
        answer:
          "Kuvitus was inspired by Excalidraw. While using Excalidraw to organise my thoughts and goals, I realised the need for a tool that could seamlessly integrate mind mapping with a To-Do list. This led to the creation of Kuvitus, which combines the flexibility of mind mapping with the structured approach of a To-Do list, facilitating better organisation and goal completion.",
      },
      {
        question: "Technologies Involved?",
        answer:
          "This platform was developed using Next.js, Rough.js, TypeScript, and utilises SessionStorage for backend functionality.",
      },
      {
        question: "What is the Future Plans section for?",
        answer:
          "This section of the About Us page, just shares the current features I may be working on for the next release. This is a side project, so I might stop development at some point. But check the Future Plans to stay updated.",
      },
      {
        question: "Contact Tony",
        answer: "You can contact me through this email: tony-koke@outlook.com",
      },
    ],
    nextFeatures: [
        {status: "pending", task: "Improve Drawing Canvas features: Deleting specfic elements, Selection highlight, Reszing elements"},
        {status: "pending", task: "Allow users to change a goal title from the Floating Goals Page"},
        {status: "pending", task: "Implement a backend. So users can sign up, sign in along with have their goals stored."},
        {status: "pending", task: "Track all completed tasks in one section. Know what you've completed and when"},
        // {status: "pending", task: ""},

    ]
  };
  