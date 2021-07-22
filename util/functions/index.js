export const generateMinimumUserFields = (user) => {
  return {
    userid: user.userid,
    username: user.username,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    company: user.company,
    imageurl: user.imageurl
  };
};

export const generateMinimumProjectFields = (project) => {
  return {
    projectid: project.projectid,
    name: project.name,
    description: project.description
  };
};

export const generateMinimumTicketFields = (ticket) => {
  return {
    ticketid: ticket.ticketid,
    title: ticket.title,
    description: ticket.description,
    imageurl: ticket.imageurl,
    completed: ticket.completed,
    priority: ticket.priority
  };
};

export const generateDateString = (inputDate) => {
  const dateArr = String(new Date(inputDate.replace(" ", "T"))).split(" ");

  return `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`;
};

export const checkErrorStatus = (error, cb) => {
  if (error.response.data.error && error.response.data.error === "invalid_token") {
    if (!process.server) {
      localStorage.clear();
    }
    cb.push("/login");
  }
};

export const projectComparator = (a, b) => {
  if (a.createddate < b.createddate) {
    return -1;
  } else if (a.createddate > b.createddate) {
    return 1;
  }
  return a.name.compareLocale(b.name);
};

export const ticketComparator = (a, b) => {
  if (a.createddate < b.createddate) {
    return -1;
  } else if (a.createddate > b.createddate) {
    return 1;
  }
  return a.title.compareLocale(b.title);
};
