'use strict';

module.exports = function(Model, options) {
  Model.dataSource.defineRelations(Model, {
    createdBy: {
      type: 'belongsTo',
      model: 'AppUser',
      foreignKey: 'createdById'
    },
    updatedBy: {
      type: 'belongsTo',
      model: 'AppUser',
      foreignKey: 'updatedById'
    },
  });

  Model.observe('before save', function event(ctx, next) {
    const userId = ctx.options.accessToken.userId;

    if(ctx.instance) {
      ctx.instance.createdById = userId;
      ctx.updatedById = userId;
    } else {
      ctx.data.updatedById = userId;
    }

    next();
  });
};
