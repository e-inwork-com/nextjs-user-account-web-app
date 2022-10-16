# [e-inwork.com](https://e-inwork.com)
# NextJS User Account Web App
The template project of the NextJS Web Application with connection to the REST API backend


## Main Packages
| Name              | Link
| ----------------- | ---------------
| React             | [https://reactjs.org](https://reactjs.org)
| Next.js           | [https://nextjs.org](https://nextjs.org)
| TailwindCSS       | [https://tailwindcss.com](https://tailwindcss.com)
| Formik            | [https://formik.org](https://formik.org)
| Axios             | [https://axios-http.com](https://axios-http.com)
| Lodash            | [https://lodash.com](https://lodash.com)
| i18next           | [https://www.i18next.com](https://www.i18next.com)


## Main Features
- [Context API](https://reactjs.org/docs/context.html): connect the component with the REST API backend
- [Hooks API](https://reactjs.org/docs/hooks-reference.html): use a Context API on every component
- [useFormik](https://formik.org/docs/api/useFormik): easy way using a Formik library on the component
- [useTranslation](https://react.i18next.com/latest/usetranslation-hook): localize UI to support multiple language
- [Utility-first CSS Framework](https://tailwindui.com/components): to think how component display on the screen, rather than focusing on the functionality of the item being styled


## Setting up the development environment with Docker
### Run the Application in the localhost environment
1. Setup the REST API backend for this application, and follow how to setup it on this repository [https://github.com/e-inwork-com/django-user-account-api](https://github.com/e-inwork-com/django-user-account-api)
2. Install Docker, if you don't have it
   - https://docs.docker.com/get-docker/
3. Git clone this repository to your localhost and from terminal run below command:
   ```
   git clone git@github.com:e-inwork-com/nextjs-user-account-web-app.git
   ```
4. Change the active folder to `nextjs-user-account-web-app` and run Docker Compose:
   ```
   cd nextjs-user-account-web-app
   ```
5. Copy file `.env.example` to `.env.local`. This file is the setting environment to connnect this application to the REST API backend
6. Run the Docker file with Docker Compose
   ```
   docker-compose up -d
   ```
7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Try the UI, and following feature:
    - Register a user
    - Login to the account
    - Update the user account
    - Logout from the user account
8. Have fun, and good luck!