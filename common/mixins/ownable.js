'use strict';

module.exports = function(Model, options) {
  Model.dataSource.defineRelations(Model, {
    createdBy: {
      type: 'belongsTo',
      model: 'Community',
      foreignKey: 'createdBy'
    },
    updatedBy: {
      type: 'belongsTo',
      model: 'Community',
      foreignKey: 'updatedBy'
    },
  });

  Model.observe('before save', function event(ctx, next) {
    const userId = ctx.options.accessToken.userId

    if(ctx.instance) {
      ctx.instance.createdBy = userId;
    } else {
      ctx.data.updatedBy = userId;
    }

    next();
  });
};
