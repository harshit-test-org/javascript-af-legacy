## Contribution

Require node version > 8

---

### Getting started

1. Fork this project
2. Clone your fork and prepare it.

```sh
> git clone https://github.com/YOUR_USERNAME/YOUR_FORK_NAME.git
> cd YOUR_FORK_NAME
> yarn install
> yarn start
```

---

## Rules

1. Use `yarn` package manager as we have used yarn to scaffold the app. See
   https://yarnpkg.com
2. Make a separate branch per feature added or bug fixed. Make a different PR
   for each so that we can track history better.
3. **DO NOT COMMIT CHANGES THAT BREAKS THE RENDER**
4. No unnecessary discussion about style guide. Always run precommit hook as
   prettier and eslint can format. You can add them to you editor as well. You
   can code in your own style and prettier and eslint will change it to standard
   JS style which is our requirement.
5. Open a new issue for a new feature so that we may add it to our kanban board. This is optional
6. **Always Commit using `yarn cm` that will kick off commentizen.**
7. Running tests before commit is recommended
8. Do not commit package-lock.json as we are using yarn.lock
9. Keep you environment vars in .env file. If you add any .env file make sure to
   add the entities in a .env.sample file for the repo.
10. Keep your fork up to date as to avoid merge conflicts
11. You code will be tested in Travis CI. Also try to write tests for new features
12. Happy coding!!

---

### Keeping your fork up to date

1. Add the main repository as the upstream remote to your local repository

```sh
> git remote add upstream https://github.com/JesseRWeigel/javascript-af.git
```

2. Simply pull the changes to your branch

```sh
> git pull upstream master
```

3. Push your repository to your remote

```sh
> git push origin master
```
