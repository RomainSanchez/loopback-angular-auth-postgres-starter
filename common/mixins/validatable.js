'use strict';

module.exports = function(Model, options) {
  Model.dataSource.defineRelations(Model, {
    validatedBy: {
      type: 'belongsTo',
      model: 'AppUser',
      foreignKey: 'validatedById'
    }
  });

  Model.defineProperty('validatedAt', {
    type: Date
  });

  Model.observe('before save', function event(ctx, next) {
    const userId = ctx.options.accessToken.userId;

    const object = ctx.instance ? ctx.instance : ctx.data;

    if (object.status === 'valid') {
      object.validatedById = userId;
      object.validatedAt = new Date();
    }

    next();
  });
};
