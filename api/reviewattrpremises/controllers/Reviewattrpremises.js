'use strict';

/**
 * Reviewattrpremises.js controller
 *
 * @description: A set of functions called "actions" for managing `Reviewattrpremises`.
 */

module.exports = {

  /**
   * Retrieve reviewattrpremises records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.reviewattrpremises.search(ctx.query);
    } else {
      return strapi.services.reviewattrpremises.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a reviewattrpremises record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reviewattrpremises.fetch(ctx.params);
  },

  /**
   * Count reviewattrpremises records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.reviewattrpremises.count(ctx.query);
  },

  /**
   * Create a/an reviewattrpremises record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.reviewattrpremises.add(ctx.request.body);
  },

  /**
   * Update a/an reviewattrpremises record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reviewattrpremises.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an reviewattrpremises record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reviewattrpremises.remove(ctx.params);
  }
};
