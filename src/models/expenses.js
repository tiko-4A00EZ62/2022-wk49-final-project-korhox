import db from '../db.js';

const expenses = {
  findAll: (params) => new Promise((resolve, reject) => {
    const baseQuery = db.select("*").from("expenses")
      .andWhere(builder => {
        if (params.description && params.description != "undefined") builder.where("description", "like", `%${params.description}%`);
        if (params.recipient && params.recipient != "undefined") builder.where("recipient", "like", `%${params.recipient}%`);
        if (params.category && params.category != "undefined") builder.where("category", "like", `%${params.category}%`);
        if (params.amountFrom && params.amountFrom != "undefined") builder.where("amount", ">=", params.amountFrom);
        if (params.amountTo && params.amountTo != "undefined") builder.where("amount", "<=", params.amountTo);
        if (params.dateFrom && params.dateFrom != "undefined") builder.where("date", ">=", params.dateFrom);
        if (params.dateTo && params.dateTo != "undefined") builder.where("date", "<=", params.dateTo);
      })
      .orderBy(params.orderBy || 'date', params.order || 'asc');

    const fullQuery = baseQuery.clone();

    fullQuery.then((fullResult) => {
      const limit = params.limit || 10;
      const mainQuery = baseQuery.clone()
        .limit(params.limit || limit)
        .offset(((params.page || 1) - 1) * limit);

      mainQuery.then((result) => {
        const current_page = params.page || 1;
        const total_pages = Math.ceil(fullResult.length / limit);

        resolve({
          data: result,
          meta: {
            pages: {
              current: current_page,
              total: total_pages,
              limit: limit,
            },
            results: fullResult.length,
            amount: {
              total: fullResult.reduce((a, b) => a + (b['amount'] || 0), 0),
              page_total: result.reduce((a, b) => a + (b['amount'] || 0), 0),
            }
          }
        });
      }).catch((err) => {
        reject(err);
      });

    }).catch((err) => {
      reject(err);
    });
  }),
  findOne: (id) => new Promise((resolve, reject) => {
    db.select("*").from("expenses").where("id", id).first()
      .then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
  }),
  insert: (data) => new Promise((resolve, reject) => {
    db.insert(data).into("expenses")
      .then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
  }),
  update: (id, data) => new Promise((resolve, reject) => {
    db("expenses").where("id", id).update(data)
      .then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
  }),
  delete: (id) => new Promise((resolve, reject) => {
    db("expenses").where("id", id).del()
      .then((result) => {
        resolve(result);
      }).catch((err) => {
        reject(err);
      });
  }),
}

export default expenses;
