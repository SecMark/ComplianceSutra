export default {
  companyEntityId: "C",
  licenseEntityId: "I",
  historyEntityId: "H",
  flag: "1",
  errorMessage: {
    errorDueToGreaterDate:
      "Date cannot be later than current date. Please change the selected date.",
    errorDueToRange:
      "Range Cannot be more than 1 year. Please change the selected date.",
    errorDueToReverseDate: "Date should be after ",
    errorDueToPriorDate: "Date should not be prior to date of registration.",
    errorDueToPreviousDate: "Date should be after today's date.",
    errorDueToMoreThanOneYearDateFromToday:
      "Date should be less than 1 year from today's date.",
    errorDueToBeforeDate: "Date should not be prior to today's date.",
    errorDueToPriorDate: "Date should not be prior to date of registration.",
    errorDueToPreviousDate: "Date should be after today's date.",
    errorDueToMoreThanOneYearDateFromToday:
      "Date should be less than 1 year from today's date.",
  },
  filterFlag: "A",
  status: "status",
  license: "license",
  company: "company",
  team: "team",
  ReAssignFilterTypes: {
    migrateAllTasksInDateRange: "MIGRATE_ALL_TASKS_IN_DATE_RANGE",
    migrateAllTasksOfParticularDate: "MIGRATE_ALL_TASKS_OF_PARTICULAR_DATE",
    migrateAllTasksForever: "MIGRATE_ALL_TASKS_FOREVER",
  },
  ReAssignFlags: ["0", "1", "2"],
  ReAssignMessages: {
    individualTaskSuccess: "Task successfully re-assigned to ",
    success: "Tasks successfully re-assigned to ",
    error: "An error occured! Please try again.",
  },
  NumberOfItemsHelp: 3,
  Weeks: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],

  ExpertUser: "8",
  ExpertReviewerBaseUrl: "/expert-review",
  SuperAdminBaseURL: "/super-admin",
  MigrateTaskMessages: {
    success: "Migration Request has been submitted successfully!",
    MembershipDetails: {
      recommendedText: "RECOMMENDED",
      plans: [
        {
          id: 1,
          name: "Monthly",
          users: 5,
          isRecommended: false,
          isDefaultSelected: false,
        },
        {
          id: 2,
          name: "Annual",
          users: 10,
          isRecommended: true,
          isDefaultSelected: true,
        },
      ],
    },
    MembershipDetails: {
      recommendedText: "RECOMMENDED",
      plans: [
        {
          id: 1,
          name: "Monthly",
          users: 5,
          isRecommended: false,
          isDefaultSelected: false,
        },
        {
          id: 2,
          name: "Annual",
          users: 10,
          isRecommended: true,
          isDefaultSelected: true,
        },
      ],
    },
  },

  expertReview: "exp",
  complianceOfficer: "compl",
  day: "day",
  month: "month",
  week: "week",
  increment: "increment",
  decrement: "decrement",
};
