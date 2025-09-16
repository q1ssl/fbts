### fbts

fbts

### Installation

You can install this app using the [bench](https://github.com/frappe/bench) CLI:

```bash
cd $PATH_TO_YOUR_BENCH
bench get-app $URL_OF_THIS_REPO --branch develop
bench install-app fbts
```

### Contributing

This app uses `pre-commit` for code formatting and linting. Please [install pre-commit](https://pre-commit.com/#installation) and enable it for this repository:

```bash
cd apps/fbts
pre-commit install
```

Pre-commit is configured to use the following tools for checking and formatting your code:

- ruff
- eslint
- prettier
- pyupgrade

### License

mit

### HRMS Installtion


# Install bench CLI
```bash
pip3 install frappe-bench
```

# Initialize bench
bench init frappe-bench --frappe-branch version-15
cd frappe-bench
```bash
bench init frappe-bench --frappe-branch version-15
cd frappe-bench
```

# Create a new site

```bash
bench new-site your-site-name.com
```
# Get ERPNext and HRMS
```bash
bench get-app erpnext --branch version-15
bench get-app hrms --branch version-15
```


# Install apps on your site
```bash
bench --site your-site-name.com install-app erpnext
bench --site your-site-name.com install-app hrms
```


```bash
bench start
```
# fbts
