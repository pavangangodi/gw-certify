import type { ParsedQuestion } from "../types/domain.js";

export interface PredefinedQuestionSetData {
  id: string;
  name: string;
  label: string;
  sourceFile: string;
  domainId: string;
  questions: ParsedQuestion[];
}

export const predefinedQuestionSets: PredefinedQuestionSetData[] = [
  {
    "id": "set-1",
    "name": "Guidewire Exam QA Set 1",
    "label": "Set 1",
    "sourceFile": "Guidewire_Exam_QA_Set_1.docx",
    "domainId": "policycenter",
    "questions": [
      {
        "prompt": "A Typelist is _______",
        "options": [
          "a set of fields or attributes related to an object",
          "a set of references to another entity",
          "associated with a type key field",
          "a set of values used as the source of drop-down lists"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "All of the following are characteristics of a good requirement except:",
        "options": [
          "Feature",
          "Clear",
          "Traceable",
          "Verifiable"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Guidewire Marketplace is a website designed for browsing and downloading product add-ons?",
        "options": [
          "detailed requirements documentation",
          "Accelerators",
          "end-user documentation",
          "User Story Cards"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Story huddles are used to clarify functional requirement details and typically involve collaboration among which three required project team members?",
        "options": [
          "Subject Matter Experts",
          "Developers",
          "Product Owners",
          "Quality Analysts",
          "Business Analysts"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which resource provides specific guidance to Business Analysts on how to document User Story Cards?",
        "options": [
          "Miro Business Analyst Handbook",
          "SurePath collateral User Story Handbook",
          "SurePath collateral User Story Guide",
          "Miro-User Story Job Aid"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Knowing application logic helps non-developers define and document the business logic requirements for:",
        "options": [
          "APIs",
          "Data Dictionaries",
          "application processing flow",
          "rule conditions and actions"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "During which phase are the accepted user stories further elaborated, defined and built?",
        "options": [
          "Development",
          "Stabilization",
          "Maintenance and Support",
          "Pre-Inception"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Gosu rules consist of _______",
        "options": [
          "A business rule that evaluates true or false",
          "A Condition that evaluates to true or false",
          "A business object or Root subject",
          "An Audit that executes if the condition is true, nothing happens if the condition is false"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "In InsuranceSuite, Page Configuration Format files (PCF) control the user interface. Which of the following are examples of common widgets used in PCF files?",
        "options": [
          "Name Value View",
          "List iterator",
          "Card",
          "Name Space View",
          "Detail View"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ requirements are based on federal and/or state legislation that impact the project.",
        "options": [
          "Privacy",
          "Business",
          "Regulatory",
          "National Legislative"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "The screen location information can be interrogated by selecting the following keys on your keyboard.",
        "options": [
          "ALT+CTRL+W",
          "ALT+CTRL+I",
          "ALT+CTRL+T",
          "ALT+SHIFT+W",
          "ALT+SHIFT+I",
          "ALT+SHIFT+T"
        ],
        "answerIndex": 4,
        "answerIndexes": [
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Business case completed, Business resources trained, User stories mapped to the business case, and Project tools identified are all deliverables of the _______ phase.",
        "options": [
          "Development",
          "Stabilization",
          "Pre-Inception",
          "Inception"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Success factors for a cross-functional team are?",
        "options": [
          "Active Business Involvement",
          "Collaboration Software",
          "Empowered Decision Making",
          "Weekly Status Reports"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following statements describe the importance of acceptance criteria in a software implementation project?",
        "options": [
          "They facilitate the writing of automated test scenarios with BDD",
          "They are used to confirm whether the user story can be accepted",
          "They describe desired system functionality when \"done\" from the business perspective",
          "They describe how to correctly configure and code requirements",
          "They are acceptance tests"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "According to the training, what are the common activities of a Quality Analyst?",
        "options": [
          "Provides impact analysis of downstream systems",
          "Monitors defects and retests as needed",
          "Executes testing",
          "Assist in defining concrete examples of system behaviors when using BDD",
          "Resolves defects",
          "Represents the voice of the customer"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which team member is responsible for executing the tests, in order to validate that features were developed per requirements?",
        "options": [
          "Developer",
          "Quality Analyst",
          "Business Analyst",
          "Project Manager"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Gosu rules are _______",
        "options": [
          "Created and maintained by developers",
          "Configured by Analysts after they are documented in the User Story Cards",
          "Managed in Business Rules UI screens",
          "Capable of handling complex logic"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Each Guidewire product has a set of _______ that identify common processes within the product.",
        "options": [
          "Configuration Guide",
          "Application Guides (User Guides)",
          "Themes",
          "backlog priorities"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What features have been added to InsuranceSuite to make it more accessible to disabled users that Business Analysts should consider when making changes to the User Interface?",
        "options": [
          "User Interface support with closed captions for the hearing impaired",
          "Screen reader support with Alt text and WAI-ARIA attributes",
          "New screen settings for User interface magnification and color contrast",
          "Braille keyboard support for visually impaired"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "According to SurePath Best Practices, which of these are key activities in the Inception Phase of the Project?",
        "options": [
          "Elaborate Requirements",
          "Build Solutions",
          "Estimate the Backlog",
          "Developer Training",
          "Value consulting Workshop"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the likely impacts of unvalidated assumptions in the requirements-gathering process?",
        "options": [
          "Longer Sprint Duration",
          "Longer Code Reviews",
          "Higher Project Costs",
          "Increased Developer Unit Test Defects",
          "Requirements in Conflict"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "User story cards are filled out during elaboration and contain details about:",
        "options": [
          "Guiding Principles",
          "Design elements including UI Mock up and Type-lists",
          "Validation and Business Rules",
          "Product configuration steps"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are common roles on an implementation project team?",
        "options": [
          "Business Analyst",
          "Product Sponsor Analyst",
          "Subject Matter Expert",
          "Sales Executive"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Select each phase of the project lifecycle that reference User Story Cards in some manner.",
        "options": [
          "Deployment",
          "Inception",
          "Pre-Inception",
          "Support and Success"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "A well-written and appropriately versioned requirements document is MORE likely to _______",
        "options": [
          "result in the development of an incorrect solution",
          "confuse stakeholders",
          "miss major components of the business problem",
          "result in the development of a viable solution"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "A well written user story follows the INVEST model. INVEST is an acronym that stands for",
        "options": [
          "Investigate, Negotiable, Valuable, Estimable, Software, Testable",
          "Investigate, Negotiable, Viable, Elaborate, Small, Technology",
          "Independent, Negotiable, Viable, Elaborate, Software, Technology",
          "Independent, Negotiable, Valuable, Estimable, Small, Testable"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "A _______ key field stores a reference to a related object in another entity. It defines a unidirectional relationship. For example, Assigned User in Claim is the name of a field that points to a specific user in the User entity.",
        "options": [
          "array",
          "type",
          "foreign",
          "field"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Identify which of the following are phases in the Guidewire Project Lifecycle:",
        "options": [
          "Sprint 0",
          "Testing",
          "Stabilization",
          "Inception",
          "Go-Live",
          "Sprint 1"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following is an example of how User Story Cards can be customized:",
        "options": [
          "Add a new tab for needs like data mapping",
          "Duplicate the requirement fields on all tabs",
          "Add a new column for test results",
          "Add a new column column to each tab with requirement number",
          "Add a requirements field to the UI Mockup Tab"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are deliverables during the Inception Phase of a project?",
        "options": [
          "Process Maps",
          "Conceptual Sprint Plan",
          "Detail Design Document (DDD)",
          "Estimated User Stories",
          "Set 1 - Additional Questions"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Please select User Story Card best practices from the list below:",
        "options": [
          "Change a requirement number after the story card has been published",
          "Include field requirements in the UI Mock-up tab",
          "Include a requirement number for trace-ability",
          "Review every requirement with the team"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "During the development phase of the project, what activities are completed in relationship to user stories?",
        "options": [
          "User stories are tested by End Users for End-to-End Business Processing",
          "User stories are Checked into the production Code branch by Developers",
          "User stories are further elaborated and documented in story cards.",
          "User stories are initially prioritized for scheduling in sprints",
          "User stories are all evaluated for inclusion in project scope",
          "User stories are tested by Quality Analysts against Acceptance Criteria"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Why is it important for non-developers to have a basic understanding of User Interface (UI) components and architecture?",
        "options": [
          "It helps them in making UI change requests that are consistent with the architecture",
          "It leads to better decisions about changes to UI",
          "It helps them when writing test scripts",
          "They will need to configure the product"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "At the completion of Inception, _______",
        "options": [
          "Test cases are written to test the end-to-end functionality of the system",
          "A conceptual Sprint Plan is established to guide when User Story Cards will be built out",
          "Documented acceptance criteria is tested to ensure that the who, how, and why of story cards is defined",
          "A confirmed scope and estimate is completed with associated User Story Cards"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ can impact all aspects of the project and pose a risk to success when they are believed to be true and not confirmed",
        "options": [
          "Assumptions",
          "Filters and Bias",
          "Conflicting requirements",
          "Constraints"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Guidewire Training Resources include content on the Out of the Box Functionality of Guidewire products. What website would you access to gain information and details on how to write a Quote?",
        "options": [
          "http://education.guidewire.com",
          "http://www.guidewire.com",
          "https://educationmarketplace.guidewire.com",
          "https://marketplace.guidewire.com"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the activities below could assist an Analyst in determining whether changes to application logic are needed?",
        "options": [
          "Identify if any objects or activities need to be created automatically to improve process",
          "Interrogate the widgets to inspect the accuracy of Gosu code",
          "Consider whether validation is needed for entered data and if an alert/message should display",
          "Review the fields on each screen to identify data model entities to be added or removed"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are types of integration mechanisms used with Guidewire products?",
        "options": [
          "Predefined plugins",
          "Redefined plugins",
          "Web services",
          "Aggregate services"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Please select Elaboration session Best Practice(s)?",
        "options": [
          "Don't allow multiple conversations to go on at the same time",
          "Revisit decisions made in prior sessions",
          "Focus on the client's current workflow in order to write requirements that define their current system",
          "Don't suggest that something is out of scope"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "A well-written and appropriately versioned requirements document is MORE likely to _______",
        "options": [
          "result in the development of a viable solution",
          "simplify change management to all stakeholders",
          "Include acceptance criteria for each requirement",
          "increase end-user satisfaction."
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "A Product Owner drives value and is a key stakeholder that is responsible for:",
        "options": [
          "sharing their vision with the development team",
          "signing off on user stories and defects",
          "making project decisions",
          "writing requirements during development"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which team members are part of the Three Amigos meeting?",
        "options": [
          "Quality Assurance Analyst",
          "Business Analyst",
          "Scrum Master",
          "Project Manager",
          "Quality Analyst"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which statement best describes why the Guiding Principles are important to the requirements gathering process?",
        "options": [
          "They indicate who should make prioritization choices",
          "They ensure that the key stakeholders have been involved in the requirements gathering process.",
          "They provide all the necessary project details to ensure that requirements gathering defines a solution.",
          "They help the project team objectively determine which requirements are aiding in project success."
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "From the answer below, select the option that best describes Guidewire Accelerators?",
        "options": [
          "are specific user stories developed early in the project that accelerate task completion through reuse",
          "provide an extension to a core product to meet a specific need",
          "are always completed solutions ready and available for use on your project",
          "Are available on https://education.guidewire.com"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Preparation Best Practices to complete prior to the elaboration workshop include:",
        "options": [
          "Write Acceptance Criteria for each story card used in the session",
          "Review deployment notes to ensure alignment",
          "Identify customer's key business requirements",
          "Create demonstration data necessary to demo functionality",
          "Set 1 - Final Section"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "The _______ documents the entities and typelists in a Guidewire application. This tool includes information for both the base application entities and custom extensions.",
        "options": [
          "Data Entities",
          "Data Model",
          "Data Dictionary",
          "Data Repository"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Identify which of the following are phases in the Guidewire Project Lifecycle:",
        "options": [
          "Pre-Stabilization",
          "Inception",
          "Stabilization",
          "Release"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "While a Business Analyst is not usually involved in _______ a design solution, he or she is responsible for _______ the design solution.",
        "options": [
          "writing, implementing",
          "implementing, documenting",
          "implementing, outsourcing",
          "communicating, implementing"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "An example of a tool built by Guidewire Professional Services to support Implementation Projects is:",
        "options": [
          "guiding principle",
          "user story card",
          "requirement",
          "business objective"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "The goal of an elaboration workshop is to identify value-driven changes to the OOTB User Story that supports business processes. Who are the key stakeholders in this process?",
        "options": [
          "Business Analyst",
          "Scrum Master",
          "Development resources",
          "Subject Matter Expert"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Elaborate Requirements, Confirm Scope, Plan Project / Sprints, and Infrastructure Sizing are all part of this project phase?",
        "options": [
          "Development",
          "Pre-Inception",
          "Stabilization",
          "Inception"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Why is it important for non-developers to have a basic understanding of the data model?",
        "options": [
          "It helps them know the underlying data when documenting change requests",
          "It helps them complete product configuration",
          "It is necessary for Analysts writing configuration scripts",
          "It helps them to determine whether or not a field exists in the Out of the Box product"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ provide starting points for solutions that can be customized and added to the Guidewire products.",
        "options": [
          "Accelerators",
          "Extension Packs",
          "User Story Cards",
          "Product Documentation"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ is a high-level sprint plan that is delivered at the end of inception. It is used to provide guidance on which stories are prioritized based on value or risk.",
        "options": [
          "Pre-Inception Sprint Plan",
          "Conceptual Sprint Plan",
          "Development Sprint Plan",
          "Risk-based Sprint Plan",
          "Prioritized Sprint Plan"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Which answer(s) below describe UI architecture?",
        "options": [
          "It always includes these sections: summary, overview, status, workplan, loss details, exposures, contacts",
          "It lists the widget files that makeup each screen in alphabetical order",
          "It gives a similar look and feel to all Guidewire products",
          "It is made up of the common areas: Screen Area, Sidebar, Tab Bar, Info Bar, and the Workspace"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "According to the training, what are the common activities of a Business Analyst?",
        "options": [
          "Has the business authority to make decisions",
          "Defines functional requirements and workflows",
          "Responsible for signing off on user stories and defects",
          "Always focused on demonstrating value for end users",
          "Facilitates the agile process with scrum principles"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following describes what are User Story acceptance criteria?",
        "options": [
          "They are a checklist of key activities that must be completed in order to accept a story",
          "They describe the role, the expected action, and the reason why the action is needed",
          "They describe the value delivered to end-user",
          "They tell when a user story is 'done'"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      }
    ]
  },
  {
    "id": "set-2",
    "name": "Guidewire Exam QA Set 2",
    "label": "Set 2",
    "sourceFile": "Guidewire_Exam_QA_Set_2.docx",
    "domainId": "policycenter",
    "questions": [
      {
        "prompt": "A typelist is _______",
        "options": [
          "a set of values used as the source of drop-down lists",
          "associated with a type key field",
          "a set of fields or attributes related to an object",
          "a set of references to another entity"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "All of the following are characteristics of a good requirement except:",
        "options": [
          "Traceable",
          "Clear",
          "Feature",
          "Verifiable"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Guidewire Marketplace is a website designed for browsing and downloading and product add-ons?",
        "options": [
          "detailed requirements documentation",
          "Accelerators",
          "User Story Cards",
          "end-user documentation"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Story huddles are used to clarify functional requirement details and typically involve collaboration among which three required project team members?",
        "options": [
          "Product Owners",
          "Quality Analysts",
          "Subject Matter Experts",
          "Business Analysts",
          "Developers"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which resource provides specific guidance to Business Analysts on how to document User Story Cards?",
        "options": [
          "SurePath collateral User Story Guide",
          "Miro-User Story Job Aid",
          "SurePath collateral User Story Handbook",
          "Miro Business Analyst Handbook"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Knowing application logic helps non-developers define and document the business logic requirements for:",
        "options": [
          "APIs",
          "rule conditions and actions",
          "application processing flow",
          "Data Dictionaries"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "During which phase are the accepted user stories further elaborated, defined and built?",
        "options": [
          "Development",
          "Maintenance and Support",
          "Stabilization",
          "Pre-Inception"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Gosu rules consist of _______",
        "options": [
          "A business rule that evaluates true or false",
          "A Condition that evaluates to true or false",
          "A business object or Root subject",
          "An Audit that executes if the condition is true, nothing happens if the condition is false"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "In InsuranceSuite, Page Configuration Format files (PCF) control the user interface. Which of the following are examples of common widgets used in PCF files?",
        "options": [
          "Text Input",
          "Name Space View",
          "List View",
          "Screen View",
          "Name Value View"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ requirements are based on federal and/or state legislation that impact the project.",
        "options": [
          "National Legislative",
          "Business",
          "Privacy",
          "Regulatory"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "The screen location information can be interrogated by selecting the following keys on your keyboard.",
        "options": [
          "ALT+CTRL+W",
          "ALT+CTRL+I",
          "ALT+CTRL+T",
          "ALT+SHIFT+W",
          "ALT+SHIFT+I",
          "ALT+SHIFT+T"
        ],
        "answerIndex": 4,
        "answerIndexes": [
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Business case completed, Business resources trained, Use stories mapped to the business case, and Project tools identified are all deliverables of the _______ phase.",
        "options": [
          "Development",
          "Stabilization",
          "Pre-Inception",
          "Inception"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Success factors for a cross-functional team are?",
        "options": [
          "Weekly Status Reports",
          "Empowered Decision Making",
          "Collaboration Software",
          "Active Business Involvement"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following statements describe the importance of acceptance criteria in a software implementation project?",
        "options": [
          "They facilitate the writing of automated test scenarios with BDD",
          "They are used to confirm whether the user story can be accepted",
          "They describe desired system functionality when \"done\" from the business perspective",
          "They are acceptance tests",
          "They describe how to correctly configure and code requirements"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "According to the training, what are the common activities of a Quality Analyst?",
        "options": [
          "Represents the voice of the customer",
          "Defines acceptance criteria for user stories",
          "Develops scenarios for each happy path",
          "Executes Testing",
          "Works in story huddles to understand requirements",
          "Executes Unit Testing"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which team member is responsible for executing the tests, in order to validate that features were developed per requirements?",
        "options": [
          "Developer",
          "Quality Analyst",
          "Business Analyst",
          "Project Manager"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Gosu rules are _______",
        "options": [
          "Capable of handling complex logic",
          "Managed in Business Rules UI screens",
          "Created and maintained by developers",
          "Configured by Analysts after they are documented in the User Story Cards"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Each Guidewire product has a set of _______ that identify common processes within the product.",
        "options": [
          "Application Guides (User Guides)",
          "backlog priorities",
          "themes",
          "Configuration Guide"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What features have been added to Insurance Suite to make it more accessible to disabled users that Business Analysts should consider when making changes to the User Interface?",
        "options": [
          "User Interface support with closed captions for the hearing impaired",
          "Screen reader support with Alt text and WAI-ARIA attributes",
          "New screen settings for User interface magnification and color contrast",
          "Braille keyboard support for visually impaired"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "According to SurePath Best Practices, which of these are key activities in the Inception Phase of the Project?",
        "options": [
          "Benefit-mapping Workshop",
          "Product Value and Alignment",
          "Estimate the Backlog",
          "Foundational Configuration",
          "Build Solutions"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the likely impacts of unvalidated assumptions in the requirements-gathering process?",
        "options": [
          "Increased Developer Unit Test Defects",
          "Requirements in conflict",
          "Increased Rework Efforts",
          "Longer Sprint Duration",
          "Higher Sprint Velocity"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "User story cards are filled out during elaboration and contain details about:",
        "options": [
          "Guiding Principles",
          "Design elements including UI Mock up and Type-lists",
          "Validation and Business Rules",
          "Product configuration steps"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are common roles on an implementation project team?",
        "options": [
          "Product Sponsor Analyst",
          "Subject Matter Expert",
          "Sales Executive",
          "Business Analyst"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Select each phase of the project lifecycle that reference User Story Cards in some manner.",
        "options": [
          "Support and Success",
          "Pre-Inception",
          "Inception",
          "Deployment"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "A well-written and appropriately versioned requirements document is MORE likely to _______",
        "options": [
          "result in the development of an incorrect solution",
          "miss major components of the business problem",
          "confuse stakeholders",
          "result in the development of a viable solution"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "A well written user story follows the INVEST model. INVEST is an acronym that stands for",
        "options": [
          "Independent, Negotiable, Valuable, Estimable, Small, Testable",
          "Investigate, Negotiable, Valuable, Estimable, Software, Testable",
          "Independent, Negotiable, Viable, Elaborate, Software, Technology",
          "Investigate, Negotiable, Viable, Elaborate, Small, Technology"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "A _______ key field stores a reference to a related object in another entity. It defines a unidirectional relationship. For example, Assigned User in Claim is the name of a field that points to a specific user in the User entity.",
        "options": [
          "field",
          "foreign",
          "array",
          "type"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Identify which of the following are phases in the Guidewire Project Lifecycle:",
        "options": [
          "Stabilization",
          "Delivery",
          "Maintenance",
          "Sprint 0",
          "Development",
          "Go-Live",
          "Testing"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following is an example of how User Story Cards can be customized:",
        "options": [
          "Add a new column column to each tab with requirement number",
          "Duplicate the requirement fields on all tabs",
          "Add a new tab for needs like data mapping",
          "Add a requirements field to the UI Mockup Tab",
          "Add a new column for test results"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are deliverables during the Inception Phase of a project?",
        "options": [
          "Process Maps",
          "Detail Design Document (DDD)",
          "Estimated User Stories",
          "Conceptual Sprint Plan",
          "Set 2 - Additional Questions"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Please select User Story Card best practices from the list below:",
        "options": [
          "Review every requirement with the team",
          "Change a requirement number after the story card has been published",
          "Include field requirements in the UI Mock-up tab",
          "Include a requirement number for trace-ability"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "During the development phase of the project, what activities are completed in relationship to user stories?",
        "options": [
          "User stories are tested by End Users for End-to-End Business Processing",
          "User stories are Checked into the production Code branch by Developers",
          "User stories are further elaborated and documented in story cards.",
          "User stories are initially prioritized for scheduling in sprints",
          "User stories are all evaluated for inclusion in project scope",
          "User stories are tested by Quality Analysts against Acceptance Criteria"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Why is it important for non-developers to have a basic understanding of User Interface (UI) components and architecture?",
        "options": [
          "It helps them when writing test scripts",
          "It helps them in making UI change requests that are consistent with the architecture",
          "It leads to better decisions about changes to UI",
          "They will need to configure the product"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "At the completion of Inception, _______",
        "options": [
          "Documented acceptance criteria is tested to ensure that the who, how, and why of story cards is defined",
          "Test cases are written to test the end-to-end functionality of the system",
          "A conceptual Sprint Plan is established to guide when User Story Cards will be built out",
          "A confirmed scope and estimate is completed with associated User Story Cards"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ can impact all aspects of the project and pose a risk to success when they are believed to be true and not confirmed",
        "options": [
          "Filters and Bias",
          "Constraints",
          "Assumptions",
          "Conflicting requirements"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Guidewire Training Resources include content on the Out of the Box Functionality of Guidewire products. What website would you access to gain information and details on how to write a Quote?",
        "options": [
          "http://www.guidewire.com",
          "http://education.guidewire.com",
          "https://marketplace.guidewire.com",
          "https://educationmarketplace.guidewire.com"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the activities below could assist an Analyst in determining whether changes to application logic are needed?",
        "options": [
          "Identify if any objects or activities need to be created automatically to improve process",
          "Interrogate the widgets to inspect the accuracy of Gosu code",
          "Consider whether validation is needed for entered data and if an alert/message should display",
          "Review the fields on each screen to identify data model entities to be added or removed"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are types of integration mechanisms used with Guidewire products?",
        "options": [
          "Redefined plugins",
          "Predefined plugins",
          "Web services",
          "Aggregate services"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Please select Elaboration session Best Practice(s)?",
        "options": [
          "Don't allow multiple conversations to go on at the same time",
          "Revisit decisions made in prior sessions",
          "Focus on the client's current workflow in order to write requirements that define their current system",
          "Don't suggest that something is out of scope"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "A well-written and appropriately versioned requirements document is MORE likely to _______",
        "options": [
          "prevent developer unit test defects",
          "included coded or configured of solutions to requirements",
          "support traceability of requirements",
          "Include acceptance criteria for each requirement"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "A Product Owner drives value and is a key stakeholder that is responsible for:",
        "options": [
          "sharing their vision with the development team",
          "signing off on user stories and defects",
          "making project decisions",
          "writing requirements during development"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which team members are part of the Three Amigos meeting?",
        "options": [
          "Developer",
          "Subject Matter Expert",
          "Product Owner",
          "Technical Architect",
          "Business Analyst"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which statement best describes why the Guiding Principles are important to the requirements gathering process?",
        "options": [
          "They help the project team objectively determine which requirements are adding in project success.",
          "They provide all the necessary project details to ensure that requirements gathering defines a solution.",
          "They ensure that the key stakeholders have been involved in the requirements gathering process.",
          "They indicate who should make prioritization choices"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "From the answer below, select the option that best describes Guidewire Accelerators?",
        "options": [
          "are specific user stories developed early in the project that accelerate task completion through reuse",
          "provide an extension to a core product to meet a specific need",
          "Are available on https://education.guidewire.com",
          "are always completed solutions ready and available for use on your project"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Preparation Best Practices to complete prior to the elaboration workshop include:",
        "options": [
          "Review deployment notes to ensure alignment",
          "Write Acceptance Criteria for each story card used in the session",
          "Create demonstration data necessary to demo functionality",
          "Identify customer's key business requirements",
          "Set 2 - Final Section"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "The _______ documents the entities and typelists in a Guidewire application. This tool includes information for both the base application entities and custom extensions.",
        "options": [
          "Data Dictionary",
          "Data Model",
          "Data Repository",
          "Data Entities"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Identify which of the following are phases in the Guidewire Project Lifecycle:",
        "options": [
          "Stabilization",
          "Pre-Stabilization",
          "Release",
          "Inception"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "While a Business Analyst is not usually involved in _______ a design solution, he or she is responsible for _______ the design solution.",
        "options": [
          "implementing, outsourcing",
          "communicating, implementing",
          "implementing, documenting",
          "writing, implementing"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "An example of a tool built by Guidewire Professional Services to support Implementation Projects is:",
        "options": [
          "user story card",
          "business objective",
          "requirement",
          "guiding principle"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "The goal of an elaboration workshop is to identify value-driven changes to the OOTB User Story that supports business processes. Who are the key stakeholders in this process?",
        "options": [
          "Business Analyst",
          "Scrum Master",
          "Development resources",
          "Subject Matter Expert"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Why is it important for non-developers to have a basic understanding of the data model?",
        "options": [
          "It helps them know the underlying data when documenting change requests",
          "It helps them to determine whether or not a field exists in the Out of the Box product",
          "It helps them complete product configuration",
          "It is necessary for Analysts writing configuration scripts"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ provide starting points for solutions that can be customized and added to the Guidewire products.",
        "options": [
          "User Story Cards",
          "Accelerators",
          "Extension Packs",
          "Product Documentation"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ is a high-level sprint plan that is delivered at the end of inception. It is used to provide guidance on which stories are prioritized based on value or risk.",
        "options": [
          "Prioritized Sprint Plan",
          "Development Sprint Plan",
          "Conceptual Sprint Plan",
          "Pre-Inception Sprint Plan",
          "Risk-based Sprint Plan"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which answer(s) below describe UI architecture?",
        "options": [
          "It is made up of the common areas: Screen Area, Sidebar, Tab Bar, Info Bar, and the Workspace",
          "It always includes these sections: summary, overview, status, workplan, loss details, exposures, contacts",
          "It lists the widget files that makeup each screen in alphabetical order",
          "It gives a similar look and feel to all Guidewire products"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "According to the training, what are the common activities of a Business Analyst?",
        "options": [
          "Has the business authority to make decisions",
          "Demonstrates to product owner for approval",
          "Shields the team from outside interference",
          "Represents the voice of the customer",
          "Defines functional requirements and workflows"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following describes what are User Story acceptance criteria?",
        "options": [
          "They describe the role, the expected action, and the reason why the action is needed",
          "They describe the value delivered to end-user",
          "They are a checklist of key activities that must be completed in order to accept a story",
          "They tell when a user story is 'done'"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      }
    ]
  },
  {
    "id": "set-3",
    "name": "Guidewire Exam QA Set 3",
    "label": "Set 3",
    "sourceFile": "Guidewire_Exam_QA _Set 3.xlsx",
    "domainId": "policycenter",
    "questions": [
      {
        "prompt": "What happens when requirements are managed and versioned",
        "options": [
          "Developer uses them to configure the code",
          "Responsible for sigining off on user stories and defects",
          "Guidewire begins by looking at the standard user story backlog for the project based on the products purchased and LOB to be implemented",
          "Right Product is build"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "After elaboration session, user stories are updated with",
        "options": [
          "Typelists",
          "UI Design and Business Rules",
          "Right Product is build",
          "Review current state and future state processes"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Tool provided by Guidewire to help implementation",
        "options": [
          "Support",
          "Review process maps for that theme",
          "User story card",
          "Small"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Objective of Inception elaboration session",
        "options": [
          "Theme overview Demo",
          "Detailed Story",
          "Product documentation",
          "Confirm Product backlog",
          "Story Estimation",
          "Startable plugins"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Inception Workshop goals",
        "options": [
          "Right Product is build",
          "Baseline the product",
          "Validate the size",
          "Confirm the scope"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Roles of a non developer in UI",
        "options": [
          "Responsible for sigining off on user stories and defects",
          "Communication with developersz",
          "Better decisions",
          "Consitent with Base archirtecture"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "5 common areas of UI Architecture",
        "options": [
          "Include a requirment number for traceability",
          "Screen Area",
          "Workspace",
          "Side bar",
          "Info bar",
          "Tab bar"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Short cut for Location info",
        "options": [
          "Stabilisation",
          "Data mapping b/t systems",
          "ALT+SHIFT+I",
          "Discuss user stories by theme or sub theme"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Why non developers should understand data model",
        "options": [
          "Understanding the data stored, allows a non developer to make better decisions about configuration changes",
          "If the data is present in base product",
          "Info bar",
          "Because the data is available in base model and to design the requirements pertaining to functionality"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Key which is used as a reference for related objects in data model for ex assigned user in claim",
        "options": [
          "Foreign Key",
          "PCF Files",
          "Communication with developersz",
          "Demonstrate the product features"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Definitions of Array Key , Type key, Foreign key",
        "options": [
          "Fields - atomic data stored about the entity(Non restricted values)",
          "Foreign key - A single reference to the id of another entity. Reference a single row in a related entity. For example catastrope,assigned groups",
          "Type key - A single reference to a value in a typelist, which is resrticted to acceptable values for example accident type,claim source,loss tyoe",
          "Right Product is build",
          "Array Key - A set of references to another entity.Reference multiple rows in releated entity.For example all addresses, secondary addresses, incidents"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Which documents the entities and typelists",
        "options": [
          "Include a requirment number for traceability",
          "PO use them to confim if a user story can be accepted",
          "Share vision with the development team",
          "Data Dictionary"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Type lists are",
        "options": [
          "Adding columns",
          "Consitent with Base archirtecture",
          "Defines values for drop down and assiciate with a type key",
          "Pre inceptions and Inception phases"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Non developer define business logic requirement for",
        "options": [
          "Data Dictionary",
          "UI functionality",
          "Rlue,conditions and actions",
          "Application processing flows"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which insures compliance with states a d federal regulations",
        "options": [
          "we will automate that which can and should be automated",
          "Action",
          "PO use them to confim if a user story can be accepted",
          "Regulatory requirements"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "GOSU rules consists of",
        "options": [
          "User story card",
          "A business Object / root object",
          "A Condition to evaluate to true or false and",
          "An Actions"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What logic can be configured in GOSU rules",
        "options": [
          "Application logic",
          "Business logic",
          "Detailed Story",
          "UI",
          "Entity names",
          "Classes"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "UI Logic is present in",
        "options": [
          "PCF Files",
          "Change management tab",
          "Negotiable",
          "tells us when a User story is done"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Why non developer should understand basic of integrations",
        "options": [
          "Define application requirement to support integration",
          "Data mapping b/t systems",
          "what triggers the integration - user action ,creation or updation of data, and so on Non developers assist with document requirements including data mapping between the two systems and UI changes and communicate the requirements to developers",
          "UI changes to support new data",
          "Testers use them to define test cases and derive pass\\fail status",
          "Timing - will the integration execute automatically , on demand , or on a schedule"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Integration mechanisms",
        "options": [
          "Predefined Plugins",
          "Batch process",
          "Classes",
          "Web services",
          "Messaging",
          "Startable plugins"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Why integration mechanism is used",
        "options": [
          "PCF Files",
          "UI functionality",
          "We will leverage best pratices built into the guidewire software",
          "To exchange data between applications /systems"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Phases of Guidewire project Life cycle",
        "options": [
          "Pre inception",
          "Stabilisation",
          "Support",
          "Inception",
          "Share vision with the development team",
          "Depolyment",
          "Development"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5,
          6
        ],
        "explanation": ""
      },
      {
        "prompt": "Business case completed , User story mapped to BC , Business resources trained are part of",
        "options": [
          "Pre inception phase",
          "Responsible for sigining off on user stories and defects",
          "Development",
          "Time box discussion to avoid excessive details"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Implemetation workshop and benfit mapping are done in which phase",
        "options": [
          "Update the backlogs with revised estimates and goals",
          "Active business involvemnent",
          "Pre inception phase",
          "Documents business requirements, example maps and high - level process flows"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Confirm the scope, plan the project , infrastructure sizing is done in",
        "options": [
          "Inception phase",
          "Classes",
          "Schedule the meeting in advance",
          "Small"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "which is a high level sprint plan that Is delivered at the end of the inception that outlines which user stories are build when",
        "options": [
          "extension of core product to meet specific need",
          "Consitent with Base archirtecture",
          "Negotiable",
          "Conceptual sprint plan"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "what are Product owner roles",
        "options": [
          "Answers the development teams questions",
          "Collobrates with the teams to develop and deliver the work",
          "Business authority to make decisions",
          "Share vision with the development team",
          "Leverage value and product alinment",
          "Represent the voice of the customer",
          "Responsible for sigining off on user stories and defects"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5,
          6
        ],
        "explanation": ""
      },
      {
        "prompt": "what are BA Roles",
        "options": [
          "Demonstrates to PO for Approval",
          "Works with the end user to understand the business requirements",
          "Acts as liasion with all stakeholders to ensure clear communication",
          "Assists in defining concrete examples of system behaviour in story huddles when using BDD",
          "Include a requirment number for traceability",
          "Documents business requirements, example maps and high - level process flows",
          "Works closely with developers and quality analyst during sprint execution",
          "Always focused on demonstrating value for end users",
          "Define functional requirements and workflows"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5,
          6,
          7,
          8
        ],
        "explanation": ""
      },
      {
        "prompt": "Cross functional team success factors",
        "options": [
          "Schedule the meeting in advance",
          "Frequent communication",
          "Active business involvemnent",
          "Leverage value and product alinment",
          "Empowered decision making",
          "Co located teams"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Common roles in implementation project",
        "options": [
          "QA",
          "Dev",
          "UI Design and Business Rules",
          "BA"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "User story consists of",
        "options": [
          "Role",
          "Action",
          "Reason",
          "We will drive adherence to product alignment"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "INVEST Full form",
        "options": [
          "Independent",
          "we will automate that which can and should be automated",
          "Testable",
          "Negotiable",
          "Small",
          "Valuable",
          "Estimable"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3,
          4,
          5,
          6
        ],
        "explanation": ""
      },
      {
        "prompt": "Story elaboration goal is identifying value driven changes to OOTB story who are the key stakeholders",
        "options": [
          "BA and SME ( Subject Matter Experts)",
          "Accelarators and extension packs",
          "Business authority to make decisions",
          "Review every requirement with the team"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Elaboration Session Sequencing",
        "options": [
          "Guidewire begins by looking at the standard user story backlog for the project based on the products purchased and LOB to be implemented",
          "Standard process flows are reviewed and how those tie back to the product screen functionality",
          "After the elaboration conversation, the user story is revisited to validate the estimate for the user story. The team may decide the user story is not required then the estimate can be reduced or increased or perhaps to create a new user story if there is a gap requirement to address during the implementation",
          "Follow a set of UI standards Don’t's",
          "High level reqs along with any concerns and possible gaps are discussed"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Requirement gathering sequencing",
        "options": [
          "Timing - will the integration execute automatically , on demand , or on a schedule",
          "-",
          "Dev",
          "Baseline the product"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Who uses acceptance criteria in user story workflow",
        "options": [
          "Testers use them to define test cases and derive pass\\fail status",
          "PO use them to confim if a user story can be accepted",
          "BA capture them during requirement gathering",
          "tells us when a User story is done",
          "Developer uses them to configure the code"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Accpetance criteria is",
        "options": [
          "UI Design and Business Rules",
          "Works closely with developers and quality analyst during sprint execution",
          "Contains check lists that should be completed before user story is accepted",
          "tells us when a User story is done"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the common process in guidewire product",
        "options": [
          "Themes and Application guide",
          "QA",
          "We are not bound by the way we have always done things",
          "UI Design and Business Rules"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Activities in inceptions workshop / elaboration sessions",
        "options": [
          "Tab bar",
          "Update the backlogs with revised estimates and goals",
          "Gather enough information to estimate story",
          "Demonstrate the product features",
          "Review process maps for that theme",
          "Time box discussion to avoid excessive details",
          "Discuss user stories by theme or sub theme"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "explanation": ""
      },
      {
        "prompt": "Which statement best describes Guiding principles",
        "options": [
          "We will strive for common workflows,processes and system across the organization",
          "we will automate that which can and should be automated",
          "We are not bound by the way we have always done things",
          "We will leverage best pratices built into the guidewire software",
          "We are not building a system from scratch.",
          "We will challenge current processes",
          "We will drive adherence to product alignment",
          "The hardest single part of building a software system is deciding precisely what to build.",
          "Works with the end user to understand the business requirements"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "explanation": ""
      },
      {
        "prompt": "Which site is used for accessing guidewire training material on base product",
        "options": [
          "education.guidewire.com",
          "extension of core product to meet specific need",
          "Fields - atomic data stored about the entity(Non restricted values)",
          "Pre inceptions and Inception phases"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "In market place you can download ?",
        "options": [
          "Accelarators and extension packs",
          "Define functional requirements and workflows",
          "DO's",
          "Stabilisation"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Accelarators are best defined as",
        "options": [
          "Communication with developersz",
          "Works with the end user to understand the business requirements",
          "extension of core product to meet specific need",
          "Right Product is build"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "which provides starting point for solution that can be customised",
        "options": [
          "Product documentation",
          "Review inception notes and any backlog refinement details",
          "Accelarators",
          "Detailed Story"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "In which phase we use story cards",
        "options": [
          "Pre inceptions and Inception phases",
          "dev",
          "Responsible for sigining off on user stories and defects",
          "Define application requirement to support integration"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Do's and Don’t's from a user story",
        "options": [
          "Include a requirment number for traceability",
          "Change the requirement number after the requirement is published",
          "DO's",
          "Implement a peer review process",
          "Include field requirement in the UI Mockup tabs",
          "Review every requirement with the team",
          "Document the same requirement in the more than one place",
          "Follow a set of UI standards Don’t's",
          "Typelists"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "explanation": ""
      },
      {
        "prompt": "Examples of user story customisation",
        "options": [
          "Integration trigger tabs",
          "More than one answer is correct",
          "Adding columns",
          "Change management tab",
          "Adding tabs",
          "Integration failover tabs",
          "Permit more than one conversation at a time"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Best practices before attending a workshop",
        "options": [
          "Review the application guide and functionality in the sandbox",
          "Prepare for your audience(Supporters, detractors, New to the project and so on)",
          "Prepare tools to be used for capturing notes( MIndmaps miro boards,Example Maps)",
          "Review inception notes and any backlog refinement details",
          "review any training material and training notes",
          "Review current state and future state processes",
          "Batch process",
          "Identify key questions to be answered during the workshop",
          "Create demonstration date necessary to demo functionality"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4,
          5,
          7,
          8
        ],
        "explanation": ""
      },
      {
        "prompt": "Best practices while elaborating requirements",
        "options": [
          "Do NOT",
          "Use standard workflows and screens as a starting point",
          "Listen to the conversation",
          "Focus on the happy path first then edge cases",
          "DO's",
          "Permit more than one conversation at a time",
          "Review inception notes and any backlog refinement details",
          "More than one answer is correct",
          "Use parking lot for off topic items"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4,
          5,
          7,
          8
        ],
        "explanation": ""
      },
      {
        "prompt": "While business analaysts are not responsible for ---- design he is responsible for ---- design",
        "options": [
          "Implementing",
          "Document",
          "Depolyment",
          "Revisit decisions"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Who performs test execution",
        "options": [
          "Update the backlogs with revised estimates and goals",
          "Application processing flows",
          "Communication with developersz",
          "QA"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "In Which phase accepted user story are defined , build and tested for development",
        "options": [
          "Accelarators",
          "Adding tabs",
          "Development Phase",
          "PCF Files"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      }
    ]
  },
  {
    "id": "set-4",
    "name": "Guidewire Exam QA Set 4",
    "label": "Set 4",
    "sourceFile": "Guidewire_Exam_QA _Set 4.xlsx",
    "domainId": "policycenter",
    "questions": [
      {
        "prompt": "Where can accelerators, software and products add-ons can be accessed",
        "options": [
          "is set a New",
          "Implement a peer review process",
          "Can be used as a drop down",
          "Guidewire Marketplace"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following provide extension to core product (Partial Solution), but NOT the complete solution",
        "options": [
          "Estimate stories using points",
          "Request clarification from the client and explain how the requirements are conflict",
          "Extension Packs",
          "Accelerators"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which is not a characteristic of good requirement",
        "options": [
          "Estimable",
          "Write requirements and Test the requirements",
          "Small",
          "Characteristic of good requirement",
          "Feature",
          "Verfiable",
          "Negotiable",
          "Testable"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        "explanation": ""
      },
      {
        "prompt": "In which guidewire website you will find training resources, course materials, training materials where it will show how can we prepare a quote?",
        "options": [
          "education.guidewire.com",
          "We should not challenge current process",
          "Works closely with the Developers and Testers",
          "change management"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Select the Guiding Principles suggested by Guidewire",
        "options": [
          "We are not bound by the way we have always done things",
          "We will challenge current process",
          "We should not challenge current process",
          "We will automate that which we can and should be automated"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which factor make requirements believed to be true, but not confirmed",
        "options": [
          "Foreign Key",
          "Widget Inspector",
          "Feature",
          "Assumptions"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Success of a cros functional team depends on",
        "options": [
          "BA's and SME's",
          "Frequent Communications and Co-located teams",
          "Empowered decision making",
          "Active Business involvement"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which activity is performed by a product owner",
        "options": [
          "Shares vision with the development team",
          "Colloborates with the teams to develop and deliver the work",
          "Business Object/Root Object",
          "Business authority to make decisions"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which activity is not performed by a product owner",
        "options": [
          "Program-->Project -->Release-->Iteration-->Dailyscrum",
          "Indicates if the user can click on the field",
          "Try to breakdown the story so it can be stand alone",
          "Write requirements and Test the requirements"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Process maps are done as part of",
        "options": [
          "Development",
          "Inception",
          "Stabilization",
          "We will automate everything as much as we can"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Select best practices for inception",
        "options": [
          "Define a sprint back log at the end of inception",
          "Define a delivery back log at the end of inception",
          "Create new story cards for gap stories",
          "Estimate stories using points"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Why it is important for the non-developers to understand the basics of UI architecture and components ?",
        "options": [
          "BA",
          "Accepted Userstories",
          "They can request changes to the UI that are consistent with base product",
          "To communicate effectively with developers"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Gosu Rules consist of",
        "options": [
          "Primary object",
          "A condition that evaluates true or false",
          "A condition that doesn't evaluate true or false",
          "Business object or Root object"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Non-developers defined business logic requirements for",
        "options": [
          "To define data mapping requirements",
          "Application processing flow",
          "Rules conditions and actions",
          "UI functionality"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the mechanism used in integration framework ?",
        "options": [
          "Messaging",
          "Webservices",
          "Predefined Plugin",
          "Batch Process",
          "Automated Testing",
          "Startable Pigin"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "What is true about Gosu rules ?",
        "options": [
          "Capable of handling complex logic",
          "Managed in GW Studio",
          "Created by developers",
          "Product owner and SME"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Location Information",
        "options": [
          "Primary object",
          "Repriortize Baklog",
          "Widget Inspector",
          "To view particular PCF file in GW Studio"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "ND Should hav basic understanding of application logic because",
        "options": [
          "ND define requirments for UI Changes",
          "ND define requirments for business rules",
          "Most of the projects require some changes to application logic",
          "We are not bound by the way we have always done things",
          "ND help define requirments for Gosu rules"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Most common sprint team members",
        "options": [
          "BA",
          "Dev",
          "QA",
          "then discuss the edge case scenarios"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Benefits of Acceleartor",
        "options": [
          "Add value to multiple project",
          "Add value to one project",
          "Reduce implementation timelines by providing good starting point",
          "Available on market place"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Common customization of story cards",
        "options": [
          "integration",
          "Typekey",
          "Adding tab for data mapping",
          "Typelist",
          "change management",
          "text (Req no.)",
          "Adding column to hold dates"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3,
          4,
          5,
          6
        ],
        "explanation": ""
      },
      {
        "prompt": "Features added for the disable users in the InsuranceSuite",
        "options": [
          "Keyboard support",
          "Reduce implementation timelines by providing good starting point",
          "Screen reader support",
          "Colour contrast & Screen Magnification (Screen setting)"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Who is responsible for doing test execution after the development is completed",
        "options": [
          "QA",
          "Adding column to hold dates",
          "Identify the conflict during Unit testing or Functional testing",
          "Fixed set"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Field key",
        "options": [
          "Use OOTB work flows and screen",
          "Arraykey",
          "Typekey",
          "Foreign Key"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Screens in InsuranceSuite are built as (or) UI components are built on the top of",
        "options": [
          "Burn down chart",
          "Arraykey",
          "As part of Stabilization",
          "PCF"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Common areas of UI architecture",
        "options": [
          "Info bar and Workspace",
          "Side bar",
          "5 UI Areas - Screen area",
          "Tab bar",
          "Familiar look and Feel",
          "Info bar and Workarea"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Gosu Rule consists of",
        "options": [
          "Condition that evaluates true or false",
          "Revisit the decisions already taken during inception because client is asking for it",
          "Update the Document control to indicate what has been changed",
          "Business Object/Root Object"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Tool that generated story cards",
        "options": [
          "Restatements of requirements",
          "Proritize the sprint backlog to facilitate planning",
          "User Story Template Generator",
          "make changes based on new knowledge"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "INVEST - Expansion",
        "options": [
          "Estimable",
          "valuable",
          "Small",
          "Negotiable",
          "Appraisal cost",
          "Testable",
          "Independent"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5,
          6
        ],
        "explanation": ""
      },
      {
        "prompt": "It reduces the timeline by providing the good starting point",
        "options": [
          "Accelerator",
          "Typelist",
          "Accelerators",
          "BA"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Which are the tools provided by GW to understand the product features ?",
        "options": [
          "Documentation/ Reference Resources",
          "Extension Packs",
          "Security Dictionary",
          "Business Rules Document"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What is the best option to solve the conflicting requirement?",
        "options": [
          "Request clarification from the client and explain how the requirements are conflict",
          "Identify the conflict during Unit testing or Functional testing",
          "Report the conflict to the client after development",
          "change management"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Guiding principle is essential",
        "options": [
          "In managing scope",
          "To reduce total cost of ownership",
          "Development",
          "Triage Feedback"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Responsibilities of a Business Analyst in Guidewire Project",
        "options": [
          "Works closely with the Developers and Testers",
          "Dev",
          "Act as a liasion with all stakeholders",
          "Gosu rules"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Mapping the use stories to business case is the deliverable of:",
        "options": [
          "Pre-Inception",
          "Accepted Userstories",
          "text (Req no.)",
          "Capable of handling complex logic"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Goal of inception is",
        "options": [
          "Confirm Scope and Estimates",
          "Enable user stories with technology",
          "Plan the project iterations",
          "Prepare for and Plan for Development Execution"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Identify the Sprint 0 deliverable",
        "options": [
          "Conceptual Sprint Plan",
          "High-Level Integration design",
          "Security dictionary documents >>",
          "Definition of Done"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "End to End Testing, Performance Testing, UAT testing is done",
        "options": [
          "Arraykey",
          "Messaging",
          "current role & permission",
          "As part of Stabilization"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "A single story card feature can be built through several user stories across several iterations ? Is it True or False ?",
        "options": [
          "true",
          "Application processing flow",
          "Reduce implementation timelines by providing good starting point",
          "Condition that evaluates true or false"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "What is the naming convention of a story card ?",
        "options": [
          "Application processing flow",
          "Automated Testing",
          "xCenter with Version - Theme - SubTheme - ID Number",
          "Delivery"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "If there are changes to the user story document on an approved version, what is the best practice while updating the requirement ?",
        "options": [
          "Burn down chart",
          "Do not change the requirement ID",
          "Determine Development and Migration Strategy",
          "Update the Document control to indicate what has been changed"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the inputs to conduct the elaboration workshop ?",
        "options": [
          "During Create or Update",
          "Review the functionality in application guide",
          "Review current state process and future state process",
          "Review inception notes"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the best practices to follow while conducting elaboration workshop ?",
        "options": [
          "then discuss the edge case scenarios",
          "Focus on happy path first",
          "Do not replicate the legacy system",
          "Revisit the decisions already taken during inception because client is asking for it",
          "Use OOTB work flows and screen"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Role of a developer in an acceptance criteria",
        "options": [
          "Developer use them to configure and code requirements",
          "Inception",
          "Team members should update tasks daily to produce the best burndown",
          "Reason (View claim)"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Which group will work on communicating the functions of the new product to the end users ?",
        "options": [
          "Change Management",
          "A condition that doesn't evaluate true or false",
          "Add value to multiple project",
          "We should not challenge current process"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the three components of user story ?",
        "options": [
          "Role (CSR)",
          "Business object or Root object",
          "Reason (View claim)",
          "Action (See all past & pending activities)"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What is the purpose of 'Available' column in the UI Fields Tab ?",
        "options": [
          "Capable of handling complex logic",
          "Points",
          "Indicates if the user can edit on the field",
          "Indicates if the user can click on the field"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "When does a field needs to be marked as 'New' in UI Fields Tab ?",
        "options": [
          "is set a New",
          "Fields which are newly added to OOTB",
          "Each field is marked as a New because it’s a new implementation",
          "Manual Exploratory Test (Blackbox testing)"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Name three benefits of Guidewire Agile Approach/Methodology",
        "options": [
          "Knowledge Transfer",
          "Created by developers",
          "Delivery",
          "Focus on Value"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which one is the integral project tool",
        "options": [
          "User story",
          "User Story Template Generator",
          "Document low level design for integrations",
          "Create new story cards for gap stories"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "User story card play an important role in which phase ?",
        "options": [
          "Pre inception",
          "Inception",
          "Characteristic of good requirement",
          "Review inception notes"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the best practices during planning a delivery sprint",
        "options": [
          "Standardize the task list before loading the Product Backlog",
          "Proritize the sprint backlog to facilitate planning",
          "Move stories to sprint as per conceptual sprint plan",
          "Proritize the release backlog to facilitate planning"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Best practices to document user story cards",
        "options": [
          "Implement a peer review process",
          "Document the same requirement in more than one place",
          "Include a requirement number for traceability",
          "Change a requiremnet number after the requirement is published"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Name three customization can be done on a user story",
        "options": [
          "Release Burn up",
          "Add a tab to provide data mapping requirements",
          "Add a tab to document possible impacts for change management team",
          "Text",
          "Add column to capture additional information such as Dates"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Best practices after the workshop",
        "options": [
          "Do not change the requirement ID",
          "Implement a peer review process",
          "Escalate risks to scrum master",
          "Follow up action items"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Acceptance criteria is",
        "options": [
          "Restatements of requirements",
          "conditions of satisfaction",
          "Descriptions of Solutions",
          "Definition of Done"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "When are acceptance criteria written in the requirements gathering process ?",
        "options": [
          "Beginning of the sprint",
          "BA's and SME's",
          "At the same time as the business requirement and before the functional requirements are written",
          "After development begins"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Success of a cros functional team depends on",
        "options": [
          "Active Business involvement",
          "Empowered decision making",
          "We will challenge current process",
          "Managed in GW Studio"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Which activity is not performed by a product owner",
        "options": [
          "Frequent Communications and Co-located teams",
          "To avoid collecting excessive details",
          "Write requirements",
          "valuable"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What is the deliverable of inception ?",
        "options": [
          "QA",
          "Burn down chart",
          "Prepare for and Plan for Development Execution",
          "Conceptual Sprint Plan"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Business cases are defined in",
        "options": [
          "Pre inception",
          "Provides impacts analysis of downstream systems",
          "Add a tab to provide data mapping requirements",
          "Role (CSR)"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Arrange layers of planning in the order",
        "options": [
          "Program-->Project -->Release-->Iteration-->Dailyscrum",
          "Use burndown charts to drive timely updates from the team",
          "Verfiable",
          "ND define requirments for business rules"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Who facilitates the progress of the project ?",
        "options": [
          "Points",
          "Foreign Key",
          "During Update only",
          "Project Manager"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Who facilitates the agile process",
        "options": [
          "To view particular PCF file in GW Studio",
          "Scrum Master",
          "Features are also known as Sub Themes",
          "Testable"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the roles of Technical Business Analyst ?",
        "options": [
          "Validate estimates during sprint planning",
          "Document transformation and cleansing rules",
          "Provides impacts analysis of downstream systems",
          "Add all tasks to in-scope stories during the sprint"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What factors indicate that a user story is good ?",
        "options": [
          "Independent",
          "Verifiable",
          "Valuable",
          "Follow up action items"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "A Project manager is preparing a plan for a GW CC implementation. What best practice he has to follow as part of project planning ?",
        "options": [
          "Plan and re-evaluate",
          "make changes based on new knowledge",
          "Basline the Project",
          "Accepted Userstories"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "Which of the following are true ? (Any 3)",
        "options": [
          "Each Feature has multiple user story",
          "Features are also known as Sub Themes",
          "Each Feature has one user story",
          "A user story can have multiple tasks",
          "Themes helps to identify the common process within the product"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "What is done during sizing and planning - Inception phase ?",
        "options": [
          "Finalize estimates",
          "Develop conceptual sprint plan",
          "Determine Development and Migration Strategy",
          "Can be used fr multipl fields"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Which criteria are used to prioritize the back log ?",
        "options": [
          "Priority",
          "value",
          "Size",
          "High level process diagram",
          "Risk"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "What is the first step while planning for a delivery sprint ?",
        "options": [
          "Determine team capacity",
          "Development",
          "Can be disabled if not needed",
          "Move stories to sprint as per conceptual sprint plan"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "What are recommendations for planning a delivery sprint?",
        "options": [
          "Add all tasks to in-scope stories during the sprint",
          "Standardize the task list before loading the product backlog",
          "Add all tasks to in-scope at any time during the sprint",
          "Move stories to sprints based on conceptual sprint plan",
          "but not in the middle",
          "Validate estimates during sprint planning"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the best practise to track the efforts?",
        "options": [
          "Write requirements and Test the requirements",
          "Team members should update tasks daily to produce the best burndown",
          "Use burndown charts to drive timely updates from the team",
          "Burn down chart"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "_______ helps to monitor the overall progress of the project",
        "options": [
          "Compare actual velocity vs planned velocity",
          "We are not bound by the way we have always done things",
          "UI",
          "Release Burn up"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "A Business analyst can revise or rewrite requirement until the sprint starts.",
        "options": [
          "Keyboard support",
          "Add value to multiple project",
          "Acceptable values",
          "true"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "How to avoid inter-story dependencies ?",
        "options": [
          "Try to breakdown the story so it can be stand alone",
          "Frequent Communications and Co-located teams",
          "Rules conditions and actions",
          "Most of the projects require some changes to application logic"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Accessing the product alignment for each user story is done as part of",
        "options": [
          "Prevention cost",
          "value",
          "Do not change the requirement ID",
          "Inception"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the key development deliverables",
        "options": [
          "Burn down chart",
          "Updated Velocity report",
          "Sprint Backlog",
          "High level process diagram",
          "Accepted Userstories",
          "Repriortize Baklog"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Monitor business and system process for health is done as part of",
        "options": [
          "Support and Success",
          "Define a delivery back log at the end of inception",
          "current configuration of data model",
          "We are not bound by the way we have always done things"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Maximum Coordination is required between",
        "options": [
          "Capable of handling complex logic",
          "Technical",
          "QA",
          "BA&SME"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Which phases in guidewire project life cyle are divided into sprints ?",
        "options": [
          "Document the same requirement in more than one place",
          "Inception",
          "Development",
          "Stabilization"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "During deployment phase, what happens during the pilot step ?",
        "options": [
          "Gather feedback",
          "Triage Feedback",
          "Implement changes as needed",
          "Allow subset of user to use the system",
          "Allow all the users to use the system"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Process maps are done as part of",
        "options": [
          "Inception",
          "Request clarification from the client and explain how the requirements are conflict",
          "Most of the projects require some changes to application logic",
          "Application processing flow"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Best practices for inception",
        "options": [
          "Estimate stories using points",
          "Create new story cards for gap stories",
          "Define a delivery back log at the end of inception",
          "Define a sprint back log at the end of inception"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Who typically attends inception ?",
        "options": [
          "dev and testers",
          "BA's",
          "Dev",
          "Product owner and SME"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "How do we estimate stories ?",
        "options": [
          "Points",
          "Negotiable",
          "Reduce implementation timelines by providing good starting point",
          "We are not bound by the way we have always done things"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "How do we estimate tasks ?",
        "options": [
          "Hours",
          "Reduce implementation timelines by providing good starting point",
          "Do not replicate the legacy system",
          "Add value to multiple project"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Entity and Typelist are defined by",
        "options": [
          "Guidewire Marketplace",
          "Business rules",
          "Data dictionary",
          "Dev"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "UI Components are built on top of",
        "options": [
          "Documentation/ Reference Resources",
          "Updated Velocity report",
          "Primary object",
          "PCF"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "A claim can have multiple claimants. How it is set at the entity level ?",
        "options": [
          "Array Key",
          "High level process diagram",
          "GW Strategic advisory team",
          "Data dictionary"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "What is true about typelist ?",
        "options": [
          "Accelerator",
          "Can be used fr multipl fields",
          "Fixed set",
          "Can be used as a drop down",
          "Acceptable values"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "Why it is important for the non-developers to understand the basics of UI architecture and components ?",
        "options": [
          "They can request changes to the UI that are consistent with base product",
          "To communicate effectively with developers",
          "Development",
          "Try to breakdown the story so it can be stand alone"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1
        ],
        "explanation": ""
      },
      {
        "prompt": "What is true about business rules?",
        "options": [
          "Can be disabled if not needed",
          "Estimable",
          "Condition must be met to take action",
          "Project Manager"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the factors to be considered for field validation ?",
        "options": [
          "During Create or Update",
          "Allow subset of user to use the system",
          "Each Feature has multiple user story",
          "Action (See all past & pending activities)"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "During Create only",
        "options": [
          "During Update only",
          "Indicates if the user can edit on the field",
          "Determine Development and Migration Strategy",
          "Program-->Project -->Release-->Iteration-->Dailyscrum"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Non-developers defined business logic requirements for",
        "options": [
          "Add all tasks to in-scope at any time during the sprint",
          "Rules conditions and actions",
          "Application processing flow",
          "UI functionality"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Why a non developer should have basic knowledge on integration ?",
        "options": [
          "Acceptable values",
          "Guidewire Marketplace",
          "Timing",
          "Data Mapping between systems"
        ],
        "answerIndex": 2,
        "answerIndexes": [
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "What are the mechanism used in integration framework ?",
        "options": [
          "Predefined Plugin",
          "Startable Plugin",
          "Batch Process",
          "Webservices",
          "Business Object/Root Object",
          "Messaging"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          3,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Data dictionary documents >>",
        "options": [
          "Priority",
          "current role & permission",
          "Security dictionary documents >>",
          "current configuration of data model"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          2,
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Example of MIRO",
        "options": [
          "Business Analyst Job Aid",
          "Report the conflict to the client after development",
          "Documentation/ Reference Resources",
          "Startable Plugin"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Goal of Inception",
        "options": [
          "Confirm Scope",
          "Basline the Project",
          "Validate sizing",
          "Descriptions of Solutions"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2
        ],
        "explanation": ""
      },
      {
        "prompt": "Guidewire timebox inception helps",
        "options": [
          "Accelerators",
          "Move stories to sprint as per conceptual sprint plan",
          "Define a sprint back log at the end of inception",
          "To avoid collecting excessive details"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "Places where the application logic exists",
        "options": [
          "UI",
          "Business rules",
          "Add a tab to document possible impacts for change management team",
          "Entity names",
          "Classes",
          "Gosu rules"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          3,
          4,
          5
        ],
        "explanation": ""
      },
      {
        "prompt": "Main areas of configuration in GW application",
        "options": [
          "Application Logic",
          "Data Model",
          "UI",
          "Revisit the decisions already taken during inception because client is asking for it",
          "Integration Mechanism"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0,
          1,
          2,
          4
        ],
        "explanation": ""
      },
      {
        "prompt": "______ sits above testing pyramid and are tested manually",
        "options": [
          "Estimable",
          "Guidewire Marketplace",
          "Dev",
          "Manual Exploratory Test (Blackbox testing)"
        ],
        "answerIndex": 3,
        "answerIndexes": [
          3
        ],
        "explanation": ""
      },
      {
        "prompt": "_______is prepared during inception phase",
        "options": [
          "Test Strategy document",
          "Business object or Root object",
          "education.guidewire.com",
          "Guidewire Marketplace"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Value consulting workshop/Business case/Strategic value workshop is led by",
        "options": [
          "GW Strategic advisory team",
          "Restatements of requirements",
          "Document low level design for integrations",
          "A condition that evaluates true or false"
        ],
        "answerIndex": 0,
        "answerIndexes": [
          0
        ],
        "explanation": ""
      },
      {
        "prompt": "Types of good quality",
        "options": [
          "Use burndown charts to drive timely updates from the team",
          "Appraisal cost",
          "Colour contrast & Screen Magnification (Screen setting)",
          "Prevention cost"
        ],
        "answerIndex": 1,
        "answerIndexes": [
          1,
          3
        ],
        "explanation": ""
      }
    ]
  }
];
