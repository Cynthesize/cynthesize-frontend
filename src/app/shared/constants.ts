// tslint:disable:max-line-length

const IDEATION_STAGE_QUESTIONS = {
  issue_to_be_solved: 'What issue are you solving? Is there no solution for this issue already in place?',
  reinventing_the_wheel: 'Are you reinventing the wheel? Or the solution is not presented elsewhere?',
  exclusive_effort: 'Is this solution exclusive? Are you providing something of value that no one else is?',
  key_features: 'List some key features of your product and/or startup, that separates you from everywhere else.'
};

const MARKETING_STAGE_QUESTIONS = {
  self_usability: 'Are you youself going to use this product? Are you a customer for yourself?',
  target_audience: 'What is your target audience? Who you think would be your initial market?',
  survey_taken: 'Have you made any market analysis, market survey or have you taken any customer feedback beforehand?',
  market_analysis: 'Who are your competitors? Directly or indirectly',
  three_prime_audience: 'Name any three of your prime sectors of people you will be focusing.'
};

const PRODUCT_DEVELOPMENT_STAGE_QUESTIONS = {
  minimal_solution: 'Does your MVP minimally solve the problem you are trying to solve?',
  initial_users: 'Who are the initial users(early adapters) for the product?',
  compatible_users:
    'Is your prototype built according to the users you are initially aiming? Will it be easier for users to adapt the MVP/solution?',
  analytics:
    'What are you using for analytics or any medium to get user feedback about the product? Are you recording for any particular feature (recommended)?',
  mobile_friendly: 'If your product is accesible via mobile devices, is it completely compatible?',
  testing: 'Is your product tested minimally for the prototype launch?'
};

const LAUNCHING_AND_TESTING_STAGE_QUESTIONS = {};
const CONSUMER_FEEDBACK_AND_ITERATION_STAGE_QUESTIONS = {};
const FUNDING_STAGE_QUESTIONS = {};

const TAGS = [
  {
    tag_name: 'Artificial Intelligence',
    tag_id: 1
  },
  {
    tag_name: 'Productivity',
    tag_id: 2
  },
  {
    tag_name: 'Home Automation',
    tag_id: 3
  },
  {
    tag_name: 'Internet of Things',
    tag_id: 4
  },
  {
    tag_name: 'Analytics',
    tag_id: 5
  },
  {
    tag_name: 'Web Application',
    tag_id: 6
  },
  {
    tag_name: 'Android',
    tag_id: 7
  },
  {
    tag_name: 'iOS',
    tag_id: 8
  },
  {
    tag_name: 'Blockchain',
    tag_id: 9
  },
  {
    tag_name: 'Health and Fitness',
    tag_id: 10
  },
  {
    tag_name: 'Social Media',
    tag_id: 11
  },
  {
    tag_name: 'Security',
    tag_id: 12
  },
  {
    tag_name: 'Robotics',
    tag_id: 13
  },
  {
    tag_name: 'Chat Messaging',
    tag_id: 14
  },
  {
    tag_name: 'Video Conferencing',
    tag_id: 15
  },
  {
    tag_name: 'Augmented Reality',
    tag_id: 16
  },
  {
    tag_name: 'VR',
    tag_id: 17
  },
  {
    tag_name: 'Dating',
    tag_id: 18
  },
  {
    tag_name: 'Music',
    tag_id: 19
  },
  {
    tag_name: 'Books',
    tag_id: 20
  }
];
// tslint:enable:max-line-length

const PROJECTS_INFO = {
  Ideation: {},
  Prototyping: {},
  Testing: {},
  Launching: {},
  Funding: {}
};

export {
  IDEATION_STAGE_QUESTIONS,
  MARKETING_STAGE_QUESTIONS,
  PRODUCT_DEVELOPMENT_STAGE_QUESTIONS,
  LAUNCHING_AND_TESTING_STAGE_QUESTIONS,
  CONSUMER_FEEDBACK_AND_ITERATION_STAGE_QUESTIONS,
  FUNDING_STAGE_QUESTIONS,
  TAGS,
  PROJECTS_INFO
};
