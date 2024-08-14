const data = [
    {
      id: 'AB12-CD34',
      content: 'content one',
      status: 'completed',
      profile: {
        name: 'Alice M. Johnson',
        year: '1',
        section: 'B',
        course: 'BA',
      },
      books: [
        {
          title: 'Introduction to Literature',
          author: 'John Smith',
        },
        {
          title: 'History of Art',
          author: 'Emma Johnson',
        },
      ],
    },
    {
      id: 'EF56-GH78',
      content: 'content two',
      status: 'in-progress',
      profile: {
        name: 'Bob R. Anderson',
        year: '2',
        section: 'C',
        course: 'BSCS',
      },
      books: [
        {
          title: 'Computer Science Basics',
          author: 'David Miller',
        },
        {
          title: 'Data Structures and Algorithms',
          author: 'Sarah Davis',
        },
        {
          title: 'Database Management',
          author: 'Michael Wilson',
        },
        {
          title: 'Web Development Fundamentals',
          author: 'Olivia Anderson',
        },
        {
          title: 'Machine Learning Essentials',
          author: 'James Brown',
        },
      ],
    },
    {
      id: 'IJ90-KL12',
      content: 'content three',
      status: 'pending',
      profile: {
        name: 'Charlie S. Davis',
        year: '4',
        section: 'A',
        course: 'BBA',
      },
      books: [
        {
          title: 'Business Ethics',
          author: 'Sophia White',
        },
      ],
    },
    {
      id: 'MN34-OP56',
      content: 'content four',
      status: 'completed',
      profile: {
        name: 'David L. Martinez',
        year: '3',
        section: 'D',
        course: 'BSCS',
      },
      books: [
        {
          title: 'Python Programming',
          author: 'Linda Clark',
        },
      ],
    },
    {
      id: 'QR78-ST90',
      content: 'content five',
      status: 'in-progress',
      profile: {
        name: 'Eva K. Harris',
        year: '2',
        section: 'E',
        course: 'BBA',
      },
      books: [
        {
          title: 'Marketing Principles',
          author: 'George Harris',
        },
        {
          title: 'Financial Accounting',
          author: 'Carol Lee',
        },
      ],
    },
    {
      id: 'UV12-WX34',
      content: 'content six',
      status: 'completed',
      profile: {
        name: 'Felix P. Adams',
        year: '4',
        section: 'F',
        course: 'BA',
      },
      books: [
        {
          title: 'Art History',
          author: 'Sophia Adams',
        },
        {
          title: 'Creative Writing',
          author: 'William Turner',
        },
      ],
    },
    {
        id: 'YZ45-AB67',
        content: 'content seven',
        status: 'in-progress',
        profile: {
          name: 'Grace T. Walker',
          year: '3',
          section: 'A',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Software Engineering Principles',
            author: 'Robert Johnson',
          },
          {
            title: 'Operating Systems Fundamentals',
            author: 'Mary Wilson',
          },
        ],
      },
      {
        id: 'CD89-EF01',
        content: 'content eight',
        status: 'completed',
        profile: {
          name: 'Helen J. Smith',
          year: '2',
          section: 'B',
          course: 'BA',
        },
        books: [
          {
            title: 'Psychology of Human Behavior',
            author: 'Mark Davis',
          },
        ],
      },
      {
        id: 'GH23-IJ45',
        content: 'content nine',
        status: 'in-progress',
        profile: {
          name: 'Isaac K. Clark',
          year: '4',
          section: 'C',
          course: 'BBA',
        },
        books: [
          {
            title: 'Economics for Decision-Making',
            author: 'Anna Lee',
          },
        ],
      },
      {
        id: 'KL67-MN89',
        content: 'content ten',
        status: 'pending',
        profile: {
          name: 'John P. Brown',
          year: '1',
          section: 'D',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Introduction to Programming',
            author: 'Daniel Smith',
          },
          {
            title: 'Statistics for Business',
            author: 'Sophia Martinez',
          },
        ],
      },
      {
        id: 'OP01-QR23',
        content: 'content eleven',
        status: 'completed',
        profile: {
          name: 'Karen R. Wilson',
          year: '3',
          section: 'E',
          course: 'BBA',
        },
        books: [
          {
            title: 'Leadership and Management',
            author: 'Ella Harris',
          },
        ],
      },
      {
        id: 'ST45-UV67',
        content: 'content twelve',
        status: 'in-progress',
        profile: {
          name: 'Laura S. Adams',
          year: '2',
          section: 'F',
          course: 'BA',
        },
        books: [
          {
            title: 'Artificial Intelligence Fundamentals',
            author: 'William Turner',
          },
          {
            title: 'Digital Marketing Strategies',
            author: 'George Clark',
          },
        ],
      },
      {
        id: 'WX89-YZ01',
        content: 'content thirteen',
        status: 'pending',
        profile: {
          name: 'Michael A. Martinez',
          year: '4',
          section: 'A',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Machine Learning Algorithms',
            author: 'Sophia Smith',
          },
        ],
      },
      {
        id: 'AB23-CD45',
        content: 'content fourteen',
        status: 'completed',
        profile: {
          name: 'Nancy E. Davis',
          year: '1',
          section: 'B',
          course: 'BA',
        },
        books: [
          {
            title: 'History of World Civilizations',
            author: 'John Adams',
          },
        ],
      },
      {
        id: 'EF67-GH89',
        content: 'content fifteen',
        status: 'rejected',
        profile: {
          name: 'Oliver P. Harris',
          year: '2',
          section: 'C',
          course: 'BBA',
        },
        books: [
          {
            title: 'Business Law',
            author: 'Emma Wilson',
          },
        ],
      },
      {
        id: 'YZ45-AB67',
        content: 'content seven',
        status: 'rejected',
        profile: {
          name: 'Grace T. Walker',
          year: '3',
          section: 'A',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Software Engineering Principles',
            author: 'Robert Johnson',
          },
          {
            title: 'Operating Systems Fundamentals',
            author: 'Mary Wilson',
          },
        ],
      },
      {
        id: 'CD89-EF01',
        content: 'content eight',
        status: 'rejected',
        profile: {
          name: 'Helen J. Smith',
          year: '2',
          section: 'B',
          course: 'BA',
        },
        books: [
          {
            title: 'Psychology of Human Behavior',
            author: 'Mark Davis',
          },
        ],
      },
      {
        id: 'GH23-IJ45',
        content: 'content nine',
        status: 'rejected',
        profile: {
          name: 'Isaac K. Clark',
          year: '4',
          section: 'C',
          course: 'BBA',
        },
        books: [
          {
            title: 'Economics for Decision-Making',
            author: 'Anna Lee',
          },
        ],
      },
      {
        id: 'KL67-MN89',
        content: 'content ten',
        status: 'rejected',
        profile: {
          name: 'John P. Brown',
          year: '1',
          section: 'D',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Introduction to Programming',
            author: 'Daniel Smith',
          },
          {
            title: 'Statistics for Business',
            author: 'Sophia Martinez',
          },
        ],
      },
      {
        id: 'OP01-QR23',
        content: 'content eleven',
        status: 'rejected',
        profile: {
          name: 'Karen R. Wilson',
          year: '3',
          section: 'E',
          course: 'BBA',
        },
        books: [
          {
            title: 'Leadership and Management',
            author: 'Ella Harris',
          },
        ],
      },
      {
        id: 'ST45-UV67',
        content: 'content twelve',
        status: 'rejected',
        profile: {
          name: 'Laura S. Adams',
          year: '2',
          section: 'F',
          course: 'BA',
        },
        books: [
          {
            title: 'Artificial Intelligence Fundamentals',
            author: 'William Turner',
          },
          {
            title: 'Digital Marketing Strategies',
            author: 'George Clark',
          },
        ],
      },
      {
        id: 'WX89-YZ01',
        content: 'content thirteen',
        status: 'rejected',
        profile: {
          name: 'Michael A. Martinez',
          year: '4',
          section: 'A',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Machine Learning Algorithms',
            author: 'Sophia Smith',
          },
        ],
      },
      {
        id: 'AB23-CD45',
        content: 'content fourteen',
        status: 'rejected',
        profile: {
          name: 'Nancy E. Davis',
          year: '1',
          section: 'B',
          course: 'BA',
        },
        books: [
          {
            title: 'History of World Civilizations',
            author: 'John Adams',
          },
        ],
      },
      {
        id: 'EF67-GH89',
        content: 'content fifteen',
        status: 'rejected',
        profile: {
          name: 'Oliver P. Harris',
          year: '2',
          section: 'C',
          course: 'BBA',
        },
        books: [
          {
            title: 'Business Law',
            author: 'Emma Wilson',
          },
        ],
      },
      {
        id: 'IJ12-KL34',
        content: 'content sixteen',
        status: 'rejected',
        profile: {
          name: 'Patricia S. Jackson',
          year: '3',
          section: 'D',
          course: 'BSCS',
        },
        books: [
          {
            title: 'Computer Networks',
            author: 'Michael Johnson',
          },
          {
            title: 'Database Systems',
            author: 'Emily Davis',
          },
        ],
      },
  ];
  
  export default data;
  