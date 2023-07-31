<h1>sample-pizza-api</h1>

<p><strong>sample-pizza-api</strong> is a NestJS-based API for managing pizza-related information and operations.</p>

<h2>Table of Contents</h2>

<ul>
  <li><a href="#description">Description</a></li>
  <li><a href="#installation">Installation</a></li>
  <li><a href="#usage">Usage</a></li>
  <li><a href="#testing">Testing</a></li>
  <li><a href="#api-endpoints">API Endpoints</a></li>
  <li><a href="#license">License</a></li>
  <li><a href="#author">Author</a></li>
</ul>

<h2 id="description">Description</h2>

<p>This project is a RESTful API built with NestJS, a progressive Node.js framework for building scalable and efficient server-side applications. The API allows users to manage various aspects related to pizzas, such as adding new pizzas, retrieving pizza details, and more.</p>

<h2 id="installation">Installation</h2>

<p>Before proceeding with the installation, make sure you have <a href="https://nodejs.org">Node.js</a> and <a href="https://www.npmjs.com/">npm</a> (Node Package Manager) installed on your system.</p>

<ol>
  <li>Clone the repository to your local machine:
    <pre><code>git clone https://github.com/ivan-aleksandrov/sample-pizza-api.git</code></pre>
  </li>
  <li>Navigate to the project directory:
    <pre><code>cd sample-pizza-api</code></pre>
  </li>
  <li>Install the project dependencies:
    <pre><code>npm install</code></pre>
  </li>
</ol>

<h2 id="usage">Usage</h2>

<p>To start the development server and run the API, use the following command:</p>

<pre><code>npm run start:dev</code></pre>

<p>The API will be available at <a href="http://localhost:3000">http://localhost:3000</a>.</p>

<h2 id="testing">Testing</h2>

<p>To run tests using Jest, use the following command:</p>

<pre><code>npm test</code></pre>

<h2 id="api-endpoints">API Endpoints</h2>

<p>The following are the available API endpoints with example requests:</p>

<ol>
  <li>
    <strong>Login:</strong> Authenticate a user and receive an access token.
    <pre><code>POST /auth/login</code></pre>
    <strong>Request:</strong>
    <pre><code>
      {
        "username": "username",
        "password": "password"
      }
    </code></pre>
    <strong>Response:</strong>
    <pre><code>
      {
        "access_token": "eyJhbGciOiJIUzI1N..."
      }
    </code></pre>
  </li>

  <li>
    <strong>Get All Orders:</strong> Retrieve all pizza orders with bearer token authorization.
    <pre><code>GET /orders/all</code></pre>
    <strong>Request Header:</strong>
    <pre><code>
      Authorization: Bearer eyJhbGciOiJIUzI1N... (Replace with your actual access token)
    </code></pre>
    <strong>Response:</strong>
    <pre><code>
      [
        {
          "id": "1",
          "timestamp": "2023-07-30T12:00:00Z",
          "username": "user1",
          "products": [
            {
              "id": "202",
              "quantity": 1,
              "additions": ["pepperoni", "cheese"],
              "deletions": ["garlic"],
              "comments": "No garlic, please.",
              "price": 12
            },
            {
              "id": "302",
              "quantity": 3,
              "additions": [],
              "deletions": [],
              "comments": "",
              "price": 15
            }
          ],
          "totalCost": 57
        }
      ]
    </code></pre>
  </li>

  <li>
    <strong>Create Order:</strong> Create a new pizza order with bearer token authorization.
    <pre><code>POST /orders</code></pre>
    <strong>Request Header:</strong>
    <pre><code>
      Authorization: Bearer eyJhbGciOiJIUzI1N... (Replace with your actual access token)
    </code></pre>
    <strong>Request:</strong>
    <pre><code>
      {
        "products": [
          {
            "id": 201,
            "quantity": 1,
            "additions": [],
            "deletions": [],
            "comments": ""
          },
          {
            "id": 202,
            "quantity": 2,
            "additions": ["mushrooms"],
            "deletions": [],
            "comments": "Extra mushrooms, please."
          }
        ]
      }
    </code></pre>
    <strong>Response:</strong>
    <pre><code>
      {
        "id": "4"
      }
    </code></pre>
  </li>

  <li>
    <strong>Get My Orders:</strong> Retrieve the order IDs for the current user with bearer token authorization.
    <pre><code>GET /orders/myOrders</code></pre>
    <strong>Request Header:</strong>
    <pre><code>
      Authorization: Bearer eyJhbGciOiJIUzI1N... (Replace with your actual access token)
    </code></pre>
    <strong>Response:</strong>
    <pre><code>
      [
        "2"
      ]
    </code></pre>
  </li>

  <li>
    <strong>Get Specific Order:</strong> Retrieve a specific pizza order with bearer token authorization.
    <pre><code>GET /orders/get/2</code></pre>
    <strong>Request Header:</strong>
    <pre><code>
      Authorization: Bearer eyJhbGciOiJIUzI1N... (Replace with your actual access token)
    </code></pre>
    <strong>Response:</strong>
    <pre><code>
      [
        {
          "id": "2",
          "timestamp": "2023-07-30T12:01:00Z",
          "username": "user2",
          "products": [
            {
              "id": "201",
              "quantity": 1,
              "additions": [],
              "deletions": [],
              "comments": "",
              "price": 10
            }
          ],
          "totalCost": 10
        }
      ]
    </code></pre>
  </li>

  <li>
    <strong>Get All Products:</strong> Retrieve all products or filter by type, e.g. type=pizzas
    <pre><code>GET /products/all?type=pizzas</code></pre>
    <strong>Request Header:</strong>
    <pre><code>
      Authorization: Bearer eyJhbGciOiJIUzI1N... (Replace with your actual access token)
    </code></pre>
    <strong>Response:</strong>
    <pre><code>
      [
        {
          "id": 201,
          "name": "Margherita",
          "price": 10,
          "type": "pizzas"
        },
        {
          "id": 202,
          "name": "Pepperoni",
          "price": 12,
          "type": "pizzas"
        },
        {
          "id": 203,
          "name": "Special",
          "price": 15,
          "type": "pizzas"
        }
      ]
    </code></pre>
  </li>

  <li>
    <strong>Healthcheck:</strong> Simple healthcheck to see if app is running
    <pre><code>GET /healthcheck</code></pre>
    <strong>Response:</strong>
    <pre><code>
      {
        "status": "ok",
        "message": "API is healthy"
      }
    </code></pre>
  </li>

<h2 id="license">License</h2>

<p>This project is licensed under the MIT License - see the <a href="./LICENSE">LICENSE</a> file for details.</p>

<h2 id="author">Author</h2>

<p><strong>Author:</strong> ivan-aleksandrov</p>
