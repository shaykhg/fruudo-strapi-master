'use strict';

/**
 * Foodtype.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all foodtypes.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('foodtype', params);
    // Select field to populate.
    const populate = Foodtype.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Foodtype
      .find()
      .where(filters.where)
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  },

  /**
   * Promise to fetch a/an foodtype.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Select field to populate.
    const populate = Foodtype.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    return Foodtype
      .findOne(_.pick(params, _.keys(Foodtype.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to count foodtypes.
   *
   * @return {Promise}
   */

  count: (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('foodtype', params);

    return Foodtype
      .count()
      .where(filters.where);
  },

  /**
   * Promise to add a/an foodtype.
   *
   * @return {Promise}
   */

  add: async (values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Foodtype.associations.map(ast => ast.alias));
    const data = _.omit(values, Foodtype.associations.map(ast => ast.alias));

    // Create entry with no-relational data.
    const entry = await Foodtype.create(data);

    // Create relational data and return the entry.
    return Foodtype.updateRelations({ _id: entry.id, values: relations });
  },

  /**
   * Promise to edit a/an foodtype.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Extract values related to relational data.
    const relations = _.pick(values, Foodtype.associations.map(a => a.alias));
    const data = _.omit(values, Foodtype.associations.map(a => a.alias));

    // Update entry with no-relational data.
    const entry = await Foodtype.update(params, data, { multi: true });

    // Update relational data and return the entry.
    return Foodtype.updateRelations(Object.assign(params, { values: relations }));
  },

  /**
   * Promise to remove a/an foodtype.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Select field to populate.
    const populate = Foodtype.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Foodtype
      .findOneAndRemove(params, {})
      .populate(populate);

    if (!data) {
      return data;
    }

    await Promise.all(
      Foodtype.associations.map(async association => {
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
   * Promise to search a/an foodtype.
   *
   * @return {Promise}
   */

  search: async (params) => {
    // Convert `params` object to filters compatible with Mongo.
    const filters = strapi.utils.models.convertParams('foodtype', params);
    // Select field to populate.
    const populate = Foodtype.associations
      .filter(ast => ast.autoPopulate !== false)
      .map(ast => ast.alias)
      .join(' ');

    const $or = Object.keys(Foodtype.attributes).reduce((acc, curr) => {
      switch (Foodtype.attributes[curr].type) {
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

    return Foodtype
      .find({ $or })
      .sort(filters.sort)
      .skip(filters.start)
      .limit(filters.limit)
      .populate(populate);
  }
};
