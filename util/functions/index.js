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