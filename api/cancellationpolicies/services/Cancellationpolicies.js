'use strict';

/**
 * Cancellationpolicies.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all cancellationpolicies.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('cancellationpolicies', params);
    // Select field to populate.
    const populate = Cancellationpolicies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Cancellationpolicies
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an cancellationpolicies.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Cancellationpolicies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Cancellationpolicies
      .findOne(_.pick(params, _.keys(Cancellationpolicies.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count cancellationpolicies.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('cancellationpolicies', params);

    return Cancellationpolicies
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an cancellationpolicies.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Cancellationpolicies.associations.map(ast => ast.alias));
    const data = _.omit(values, Cancellationpolicies.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Cancellationpolicies.create(data);

    // Create relational data and return the entry.
    return Cancellationpolicies.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an cancellationpolicies.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Cancellationpolicies.associations.map(a => a.alias));
    const data = _.omit(values, Cancellationpolicies.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Cancellationpolicies.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Cancellationpolicies.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an cancellationpolicies.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Cancellationpolicies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Cancellationpolicies
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Cancellationpolicies.associations.map(async association => {
        if (!association.via || !data._id) {
          return true;
        }

        const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
        const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

        // Retrieve model.
        const model = association.plugin ?
          strapi.plugins[association.plugin].models[association.model || association.collection] :
          strapi.models[association.model || association.collection];

        return model.update(search, update, { multi: true });
      })
    );

    return data;
  },

  /**
   * Promise to search a/an cancellationpolicies.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('cancellationpolicies', params);
    // Select field to populate.
    const populate = Cancellationpolicies.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Cancellationpolicies.attributes).reduce((acc, curr) => {
      switch (Cancellationpolicies.attributes[curr].type) {
        case 'integer':
        case 'float':
        case 'decimal':
          if (!_.isNaN(_.toNumber(params._q))) {
            return acc.concat({ [curr]: params._q });
          }

          return acc;
        case 'string':
        case 'text':
        case 'password':
          return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
        case 'boolean':
          if (params._q === 'true' || params._q === 'false') {
            return acc.concat({ [curr]: params._q === 'true' });
          }

          return acc;
        default:
          return acc;
      }
    }, []);

    return Cancellationpolicies
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
