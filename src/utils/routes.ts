const routes = {
  home: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
  task: '/tasks',
  routines: (startedDate: string) => `/routines/${startedDate}`,
  expenses: '/expenses'
}

export default routes;