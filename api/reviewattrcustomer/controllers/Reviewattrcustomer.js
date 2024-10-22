'use strict';

/**
 * Reviewattrcustomer.js controller
 *
 * @description: A set of functions called "actions" for managing `Reviewattrcustomer`.
 */

module.exports = {

  /**
   * Retrieve reviewattrcustomer records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.reviewattrcustomer.search(ctx.query);
    } else {
      return strapi.services.reviewattrcustomer.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a reviewattrcustomer record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reviewattrcustomer.fetch(ctx.params);
  },

  /**
   * Count reviewattrcustomer records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.reviewattrcustomer.count(ctx.query);
  },

  /**
   * Create a/an reviewattrcustomer record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.reviewattrcustomer.add(ctx.request.body);
  },

  /**
   * Update a/an reviewattrcustomer record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reviewattrcustomer.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an reviewattrcustomer record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reviewattrcustomer.remove(ctx.params);
  }
};
