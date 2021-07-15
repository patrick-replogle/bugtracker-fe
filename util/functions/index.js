export const generateMinimumUserFields = (user) => {
    return {
        userid: user.userid,
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        company: user.company
      }
}

export const generateMinimumProjectFields = (project) => {
    return {
        projectid: project.projectid,
        name: project.name,
        description: project.description,
    }
}

export const generateMinimumTicketFields = (ticket) => {
    return {
        ticketid: ticket.ticketid,
        title: ticket.title,
        description: ticket.description,
        imageurl: ticket.imageurl,
        completed: ticket.completed,
        priority: ticket.priority
    }
}

export function generateDateString(inputDate) {
    const dateArr = String(new Date(inputDate)).split(' ');
  
    return `${dateArr[1]} ${dateArr[2]} ${dateArr[3]}`;
}

export function checkErrorStatus(error, cb) {
    if (error.response.data.error === "invalid_token") {
        if (!process.server) {
            localStorage.clear();
        }
        cb.push('/login')
    }
}